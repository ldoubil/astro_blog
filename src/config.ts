import type {
  FriendsConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: '未闻花名',
  subtitle: '记录与分享',
  lang: 'zh_CN',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  siteStartDate: '2024-01-01',
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
    LinkPreset.Moments,
    LinkPreset.Friends,
    LinkPreset.About,
    {
      name: '网站运行状态',
      url: 'https://stats.uptimerobot.com/yxR9RH7QMw',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
  ],
}

export const friendsConfig: FriendsConfig = {
  description: '欢迎互换友链～留下脚印再走吧',
  links: [
    {
      name: '未闻花名',
      url: 'https://acg-n.cn/',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1806190090&s=640',
      description: '本站',
    },
    // {
    //   name: '友站名称',
    //   url: 'https://example.com/',
    //   avatar: 'https://example.com/avatar.png',
    //   description: '一句话介绍',
    // },
  ],
}


export const profileConfig: ProfileConfig = {
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1806190090&s=640',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "kevin",
  // Fallback when hitokoto request fails (Profile fetches live quote client-side)
  bio: '未闻花名',
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
