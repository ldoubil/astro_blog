import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: '🎮百科',
  subtitle: '游戏百科',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  themeColor: {
    hue: 250,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: true,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'https://t.alcy.cc/pc',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    // src: 'https://t.alcy.cc/acg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'top',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: '',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  toc: {
    enable: true,           // Display the table of contents on the right side of the post
    depth: 2                // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: '网站运行状态',
      url: 'https://stats.uptimerobot.com/yxR9RH7QMw',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
  ],
}


async function getname(): Promise<string> {
  const response = await fetch('https://api.mmp.cc/api/qqname?qq=1806190090');
  const data = await response.json();
  return data.data.name;
}

async function getbio(): Promise<string> {
  const response = await fetch('https://v1.hitokoto.cn/?encode=text');
  const data = await response.text();
  return data;
}


export const profileConfig: ProfileConfig = {
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1806190090&s=640',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  // Bug 修复：将 `getname()` 函数的返回值从 `Promise<string>` 改为 `string`
  name: await getname(),
  bio: await getbio(),
  links: [
    {
      name: 'QQ群',
      icon: 'fa6-brands:qq',       // Visit https://icones.js.org/ for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://qm.qq.com/q/FlQCVWBdoA',
    },
    // {
    //   name: 'Steam',
    //   icon: 'fa6-brands:steam',
    //   url: 'https://store.steampowered.com',
    // },
    // {
    //   name: 'GitHub',
    //   icon: 'fa6-brands:github',
    //   url: 'https://github.com/saicaca/fuwari',
    // },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
