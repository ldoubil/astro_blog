/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Generic external link preview card.
 *
 * Usage:
 * ::link{url="https://example.com" title="标题" desc="描述" image="https://..."}
 *
 * @param {Object} properties
 * @param {string} properties.url
 * @param {string} [properties.title]
 * @param {string} [properties.desc]
 * @param {string} [properties.image]
 * @param {import('mdast').RootContent[]} children
 */
export function LinkCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0) {
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("link" must be leaf type ::link{url="..." title="..." desc="..."})',
    ])
  }

  const url = properties?.url ? String(properties.url).trim() : ''
  if (!/^https?:\/\//i.test(url)) {
    return h(
      'div',
      { class: 'hidden' },
      'Invalid link card. (url must start with http:// or https://)',
    )
  }

  let hostname = url
  try {
    hostname = new URL(url).hostname.replace(/^www\./, '')
  } catch {
    /* keep raw */
  }

  const title = properties?.title ? String(properties.title).trim() : hostname
  const desc = properties?.desc ? String(properties.desc).trim() : ''
  const image = properties?.image ? String(properties.image).trim() : ''

  const body = [
    h('div', { class: 'lc-meta' }, [
      h('div', { class: 'lc-host' }, hostname),
      h('div', { class: 'lc-title' }, title),
      desc ? h('div', { class: 'lc-desc' }, desc) : null,
    ].filter(Boolean)),
  ]

  if (image) {
    body.unshift(
      h('div', { class: 'lc-thumb' }, [
        h('img', {
          src: image,
          alt: title,
          loading: 'lazy',
          decoding: 'async',
        }),
      ]),
    )
  }

  return h(
    'a',
    {
      class: 'card-link no-styling',
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    body,
  )
}
