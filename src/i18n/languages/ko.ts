import Key from '../i18nKey'
import type { Translation } from '../translation'

export const ko: Translation = {
  [Key.home]: '홈',
  [Key.about]: '소개',
  [Key.archive]: '아카이브',
  [Key.friends]: '이웃',
  [Key.search]: '검색',

  [Key.tags]: '태그',
  [Key.categories]: '카테고리',
  [Key.recentPosts]: '최근 게시물',
  [Key.calendar]: '아카이브 캘린더',

  [Key.comments]: '댓글',

  [Key.untitled]: '제목 없음',
  [Key.uncategorized]: '분류되지 않음',
  [Key.noTags]: '태그 없음',

  [Key.wordCount]: '단어',
  [Key.wordsCount]: '단어',
  [Key.minuteCount]: '분',
  [Key.minutesCount]: '분',
  [Key.postCount]: '게시물',
  [Key.postsCount]: '게시물',

  [Key.themeColor]: '테마 색상',

  [Key.lightMode]: '밝은 모드',
  [Key.darkMode]: '어두운 모드',
  [Key.systemMode]: '시스템 모드',

  [Key.more]: '더 보기',

  [Key.author]: '저자',
  [Key.publishedAt]: '게시일',
  [Key.license]: '라이선스',

  [Key.friendsEmpty]: '이웃 링크가 아직 없습니다.',
  [Key.notFound]: '페이지를 찾을 수 없습니다',
  [Key.notFoundHint]: '이 페이지를 찾을 수 없어요. 홈으로 돌아갈까요?',
  [Key.backHome]: '홈으로',
  [Key.backToArchive]: '아카이브로',
  [Key.searchDevHint]: '개발 환경에서는 검색할 수 없습니다',
  [Key.searchDevHintDetail]: 'npm run build && npm run preview 로 테스트하세요',
  [Key.moments]: '동적',
  [Key.momentsEmpty]: '아직 동적이 없습니다',
  [Key.siteUptime]: '{days}일째 운영 중',
  [Key.rss]: 'RSS',
  [Key.toc]: '목차',
  [Key.fortune]: '오늘의 운세',
}
