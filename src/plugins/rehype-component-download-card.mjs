/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Recursively collect plain text from a hast / mdast-like node.
 * @param {unknown} node
 * @returns {string}
 */
function getText(node) {
  if (!node || typeof node !== 'object') return ''
  if ('value' in node && typeof node.value === 'string') return node.value
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(getText).join('')
  }
  return ''
}

/**
 * Recursively collect anchor links from directive children.
 * @param {unknown[]} nodes
 * @param {{ href: string, title: string }[]} out
 */
function collectLinks(nodes, out = []) {
  if (!Array.isArray(nodes)) return out

  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue

    const tagName = 'tagName' in node ? node.tagName : undefined
    const properties =
      'properties' in node && node.properties && typeof node.properties === 'object'
        ? node.properties
        : null
    const href =
      properties && 'href' in properties ? String(properties.href || '') : ''

    if (tagName === 'a' && href) {
      const title = getText(node).trim() || href
      out.push({ href, title })
      continue
    }

    if ('children' in node && Array.isArray(node.children)) {
      collectLinks(node.children, out)
    }
  }

  return out
}

/**
 * Creates a download card component for Quark / generic download lists.
 *
 * Usage:
 * ```md
 * :::download[夸克网盘资源]
 * - [Windows 安装包](https://pan.quark.cn/s/xxxx)
 * - [Mac 安装包](https://pan.quark.cn/s/yyyy)
 * :::
 * ```
 *
 * @param {Object} properties - The properties of the component.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created download card component.
 */
export function DownloadCardComponent(properties, children) {
  if (!Array.isArray(children) || children.length === 0) {
    return h(
      'div',
      { class: 'hidden' },
      'Invalid download directive. (Use block form: :::download[标题] followed by markdown links :::',
    )
  }

  let labelNodes = children
  let title = '下载资源'

  if (properties && properties['has-directive-label']) {
    const label = children[0]
    title = getText(label).trim() || title
    labelNodes = children.slice(1)
  }

  const links = collectLinks(labelNodes)

  if (links.length === 0) {
    return h(
      'div',
      { class: 'hidden' },
      'Invalid download directive. (Add at least one markdown link: [标题](url))',
    )
  }

  const rows = links.map(({ href, title: rowTitle }) =>
    h('a', {
      class: 'dl-row no-styling',
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    }, [
      h('span', { class: 'dl-row-title' }, rowTitle),
      h('span', { class: 'dl-row-action' }, '打开'),
    ]),
  )

  return h('div', { class: 'card-download' }, [
    h('div', { class: 'dl-titlebar' }, [
      h('div', { class: 'dl-title' }, title),
      h('div', { class: 'dl-logo' }),
    ]),
    h('div', { class: 'dl-list' }, rows),
  ])
}
