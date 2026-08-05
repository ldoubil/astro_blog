/// <reference types="mdast" />
import { h } from 'hastscript'

function getText(node) {
  if (!node || typeof node !== 'object') return ''
  if ('value' in node && typeof node.value === 'string') return node.value
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(getText).join('')
  }
  return ''
}

/**
 * Collect images from directive children.
 * @param {unknown[]} nodes
 * @param {{ src: string, alt: string }[]} out
 */
function collectImages(nodes, out = []) {
  if (!Array.isArray(nodes)) return out
  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue
    const tagName = 'tagName' in node ? node.tagName : undefined
    const properties =
      'properties' in node && node.properties && typeof node.properties === 'object'
        ? node.properties
        : null
    const src =
      properties && 'src' in properties ? String(properties.src || '') : ''

    if (tagName === 'img' && src) {
      const alt =
        (properties && 'alt' in properties && String(properties.alt || '')) ||
        getText(node) ||
        ''
      out.push({ src, alt })
      continue
    }

    if ('children' in node && Array.isArray(node.children)) {
      collectImages(node.children, out)
    }
  }
  return out
}

/**
 * Album / multi-image gallery card.
 *
 * Usage:
 * ```md
 * :::gallery[相册标题]
 * ![图1](https://example.com/1.jpg)
 * ![图2](https://example.com/2.jpg)
 * :::
 * ```
 *
 * @param {Object} properties
 * @param {import('mdast').RootContent[]} children
 */
export function GalleryCardComponent(properties, children) {
  if (!Array.isArray(children) || children.length === 0) {
    return h(
      'div',
      { class: 'hidden' },
      'Invalid gallery directive. (Use :::gallery[标题] with markdown images :::',
    )
  }

  let body = children
  let title = '相册'

  if (properties && properties['has-directive-label']) {
    title = getText(children[0]).trim() || title
    body = children.slice(1)
  }

  const images = collectImages(body)
  if (images.length === 0) {
    return h(
      'div',
      { class: 'hidden' },
      'Invalid gallery directive. (Add at least one image: ![说明](url))',
    )
  }

  return h('div', { class: 'card-gallery' }, [
    h('div', { class: 'gallery-titlebar' }, [
      h('div', { class: 'gallery-title' }, title),
      h('div', { class: 'gallery-count' }, `${images.length} 张`),
    ]),
    h(
      'div',
      { class: 'gallery-grid' },
      images.map(({ src, alt }) =>
        h('figure', { class: 'gallery-item' }, [
          h('img', {
            src,
            alt: alt || title,
            loading: 'lazy',
            decoding: 'async',
          }),
          alt ? h('figcaption', { class: 'gallery-caption' }, alt) : null,
        ].filter(Boolean)),
      ),
    ),
  ])
}
