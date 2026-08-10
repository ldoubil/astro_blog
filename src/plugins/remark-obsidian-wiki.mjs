import { visit } from 'unist-util-visit'

/**
 * Convert Obsidian wiki syntax to standard mdast nodes.
 * - ![[image.png]] / ![[image.png|alt]] -> image
 * - [[page]] / [[page|label]] -> link (relative ./page)
 */
export function remarkObsidianWiki() {
  return tree => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number' || !node.value?.includes('[[')) {
        return
      }

      const value = node.value
      const re = /(!?)\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g
      const nodes = []
      let lastIndex = 0
      let match = re.exec(value)

      if (!match) return

      while (match) {
        if (match.index > lastIndex) {
          nodes.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          })
        }

        const isEmbed = match[1] === '!'
        const target = String(match[2] || '')
          .trim()
          .replace(/\\/g, '/')
        const alias = match[3] ? String(match[3]).trim() : ''
        const fileName = target.split('/').pop() || target
        const url = target.startsWith('./') || target.startsWith('/') || /^https?:/i.test(target)
          ? target
          : `./${target}`

        if (isEmbed) {
          nodes.push({
            type: 'image',
            url,
            title: null,
            alt: alias || fileName,
          })
        } else {
          nodes.push({
            type: 'link',
            url,
            title: null,
            children: [{ type: 'text', value: alias || fileName }],
          })
        }

        lastIndex = match.index + match[0].length
        match = re.exec(value)
      }

      if (lastIndex < value.length) {
        nodes.push({ type: 'text', value: value.slice(lastIndex) })
      }

      parent.children.splice(index, 1, ...nodes)
      return index + nodes.length
    })
  }
}
