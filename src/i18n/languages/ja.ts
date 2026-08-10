import Key from '../i18nKey'
import type { Translation } from '../translation'

export const ja: Translation = {
  [Key.home]: 'Home',
  [Key.about]: 'About',
  [Key.archive]: 'Archive',
  [Key.friends]: '相互リンク',
  [Key.search]: '検索',

  [Key.tags]: 'タグ',
  [Key.categories]: 'カテゴリ',
  [Key.recentPosts]: '最近の投稿',
  [Key.calendar]: 'アーカイブカレンダー',

  [Key.comments]: 'コメント',

  [Key.untitled]: 'タイトルなし',
  [Key.uncategorized]: 'カテゴリなし',
  [Key.noTags]: 'タグなし',

  [Key.wordCount]: '文字',
  [Key.wordsCount]: '文字',
  [Key.minuteCount]: '分',
  [Key.minutesCount]: '分',
  [Key.postCount]: '件の投稿',
  [Key.postsCount]: '件の投稿',

  [Key.themeColor]: 'テーマカラー',

  [Key.lightMode]: 'ライト',
  [Key.darkMode]: 'ダーク',
  [Key.systemMode]: 'システム',

  [Key.more]: 'もっと',

  [Key.author]: '著者',
  [Key.publishedAt]: '公開日',
  [Key.license]: 'ライセンス',

  [Key.friendsEmpty]: '相互リンクはまだありません。',
  [Key.notFound]: 'ページが見つかりません',
  [Key.notFoundHint]: 'このページは迷子になりました。ホームに戻りますか？',
  [Key.backHome]: 'ホームへ戻る',
  [Key.backToArchive]: 'アーカイブへ戻る',
  [Key.searchDevHint]: '開発環境では検索できません',
  [Key.searchDevHintDetail]: 'npm run build && npm run preview で試せます',
  [Key.moments]: '動態',
  [Key.momentsEmpty]: 'まだ動態がありません',
  [Key.siteUptime]: '開設から {days} 日',
  [Key.rss]: 'RSS',
  [Key.toc]: '目次',
  [Key.fortune]: '今日の占い',
}
