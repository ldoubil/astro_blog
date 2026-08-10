import type { LIGHT_DARK_MODE } from '@/types/config'
import {
  AUTO_MODE,
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
} from '@constants/constants.ts'

export function getDefaultHue(): number {
  const fallback = '250'
  const configCarrier = document.getElementById('config-carrier')
  return Number.parseInt(configCarrier?.dataset.hue || fallback)
}

export function getHue(): number {
  const stored = localStorage.getItem('hue')
  return stored ? Number.parseInt(stored) : getDefaultHue()
}

export function setHue(hue: number): void {
  localStorage.setItem('hue', String(hue))
  const r = document.querySelector(':root') as HTMLElement
  if (!r) {
    return
  }
  r.style.setProperty('--hue', String(hue))
}

function willBeDark(theme: LIGHT_DARK_MODE): boolean {
  if (theme === DARK_MODE) return true
  if (theme === LIGHT_MODE) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function playThemeTransition(goingDark: boolean) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const existing = document.querySelector('.theme-fx')
  existing?.remove()

  const root = document.createElement('div')
  root.className = `theme-fx ${goingDark ? 'is-dark' : 'is-light'}`
  root.innerHTML = `
    <div class="theme-fx-veil" aria-hidden="true"></div>
    <div class="theme-fx-blob" aria-hidden="true">${goingDark ? '☾' : '☀'}</div>
  `
  document.body.appendChild(root)
  window.setTimeout(() => root.remove(), 800)
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
  switch (theme) {
    case LIGHT_MODE:
      document.documentElement.classList.remove('dark')
      break
    case DARK_MODE:
      document.documentElement.classList.add('dark')
      break
    case AUTO_MODE:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      break
  }
}

export function setTheme(theme: LIGHT_DARK_MODE, animate = true): void {
  const beforeDark = document.documentElement.classList.contains('dark')
  const afterDark = willBeDark(theme)

  localStorage.setItem('theme', theme)

  if (animate && beforeDark !== afterDark) {
    playThemeTransition(afterDark)
    // Apply mid-animation so the veil matches the destination
    window.setTimeout(() => applyThemeToDocument(theme), 180)
  } else {
    applyThemeToDocument(theme)
  }
}

export function getStoredTheme(): LIGHT_DARK_MODE {
  return (localStorage.getItem('theme') as LIGHT_DARK_MODE) || DEFAULT_THEME
}
