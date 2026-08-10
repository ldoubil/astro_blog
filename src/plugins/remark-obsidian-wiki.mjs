import fs from 'node:fs'
import path from 'node:path'
import { visit } from 'unist-util-visit'

function projectRootFrom(file) {
  const start =
    file.cwd ||
    file.dirname ||
    (file.path ? path.dirname(file.path) : process.cwd())
  let dir = path.resolve(start)
  for (let i = 0; i < 8; i++) {
    if (
      fs.existsSync(path.join(dir, 'package.json')) &&
      fs.existsSync(path.join(dir, 'src'))
    ) {
      return dir
    }
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return path.resolve(process.cwd())
}

function resolveLocalTarget(target, file) {
  const clean = String(target || '')
    .trim()
    .replace(/\\/g, '/')
  if (!clean) return null
  if (/^https?:\/\//i.test(clean) || clean.startsWith('data:')) return clean
  if (clean.startsWith('/')) return clean

  const mdDir = path.resolve(
    file.dirname || (file.path ? path.dirname(file.path) : process.cwd()),
  )
  const root = projectRootFrom(file)
  const baseName = path.posix.basename(clean)
  const candidates = []

  if (clean.startsWith('./') || clean.startsWith('../')) {
    candidates.push(path.resolve(mdDir, clean))
  } else {
    candidates.push(path.resolve(mdDir, clean))
    candidates.push(path.resolve(root, 'src/assets/images', baseName))
    candidates.push(path.resolve(root, 'src/content/posts', baseName))
    candidates.push(path.resolve(root, 'src/content/moments', baseName))
  }

  for (const abs of candidates) {
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
      let rel = path.relative(mdDir, abs).replace(/\\/g, '/')
      if (!rel.startsWith('.')) rel = `./${rel}`
      return rel
    }
  }

  return null
}

/**
 * Convert Obsidian wiki syntax to standard mdast nodes.
 * Missing local images are left as plain text to avoid Astro ImageNotFound crashes.
 */
export function remarkObsidianWiki() {
  return (tree, file) => {
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
        const target = String(match[2] || '').trim()
        const alias = match[3] ? String(match[3]).trim() : ''
        const fileName = target.split('/').pop() || target
        const resolved = resolveLocalTarget(target, file)

        if (isEmbed) {
          if (resolved) {
            nodes.push({
              type: 'image',
              url: resolved,
              title: null,
              alt: alias || fileName,
            })
          } else {
            // Keep raw wiki text instead of emitting a broken image import
            nodes.push({ type: 'text', value: match[0] })
          }
        } else if (resolved) {
          nodes.push({
            type: 'link',
            url: resolved,
            title: null,
            children: [{ type: 'text', value: alias || fileName }],
          })
        } else {
          nodes.push({ type: 'text', value: match[0] })
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
