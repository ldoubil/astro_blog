/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Bilibili video embed card.
 *
 * Usage: ::bilibili{bvid="BV1xxxxxxxx" p="1"}
 *
 * @param {Object} properties
 * @param {string} properties.bvid
 * @param {string} [properties.p]
 * @param {import('mdast').RootContent[]} children
 */
export function BilibiliCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0) {
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("bilibili" must be leaf type ::bilibili{bvid="BVxxx"})',
    ])
  }

  const bvid = properties?.bvid ? String(properties.bvid).trim() : ''
  if (!/^BV[\w]+$/i.test(bvid)) {
    return h(
      'div',
      { class: 'hidden' },
      'Invalid bilibili card. (bvid must look like BV1xxxxxxxx)',
    )
  }

  const page = properties?.p ? String(properties.p).trim() : '1'
  // autoplay=0: do not autoplay when the iframe loads
  const src = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&page=${encodeURIComponent(page)}&high_quality=1&danmaku=0&autoplay=0`

  return h('div', { class: 'card-bilibili', 'data-bvid': bvid }, [
    h('div', { class: 'bili-titlebar' }, [
      h('div', { class: 'bili-title' }, `Bilibili · ${bvid}`),
      h(
        'a',
        {
          class: 'bili-link no-styling',
          href: `https://www.bilibili.com/video/${bvid}/`,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '打开',
      ),
    ]),
    h('div', { class: 'bili-frame', 'data-src': src }, [
      h('button', {
        type: 'button',
        class: 'bili-play-btn',
        'aria-label': '播放视频',
      }, '点击播放'),
    ]),
    h(
      'script',
      { type: 'text/javascript' },
      `
      (function(){
        if (window.__biliPlayBound) return;
        window.__biliPlayBound = true;
        document.addEventListener('click', function(e){
          var btn = e.target && e.target.closest && e.target.closest('.bili-play-btn');
          if (!btn) return;
          var frame = btn.closest('.bili-frame');
          if (!frame || !frame.dataset.src) return;
          var iframe = document.createElement('iframe');
          iframe.src = frame.dataset.src;
          iframe.allowFullscreen = true;
          iframe.loading = 'lazy';
          iframe.title = 'bilibili player';
          iframe.setAttribute('scrolling', 'no');
          iframe.setAttribute('border', '0');
          iframe.setAttribute('frameborder', 'no');
          iframe.setAttribute('framespacing', '0');
          iframe.setAttribute('allow', 'fullscreen');
          frame.innerHTML = '';
          frame.appendChild(iframe);
        });
      })();
      `,
    ),
  ])
}
