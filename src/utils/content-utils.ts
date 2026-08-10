import { getCollection } from 'astro:content'
import type { BlogPostData } from '@/types/config'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

export type SortedPost = {
  body?: string
  data: BlogPostData
  id: string
  slug: string
}

export type SortedMoment = {
  body?: string
  data: { published: Date; draft?: boolean }
  id: string
  slug: string
}

export type HomeFeedItem =
  | { type: 'post'; published: Date; entry: SortedPost }
  | { type: 'moment'; published: Date; entry: SortedMoment }

export async function getSortedPosts(): Promise<SortedPost[]> {
  const allBlogPosts = (await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })).map(post => ({
    ...post,
    // Keep slug alias for existing callers (Content Layer uses id)
    slug: post.id,
  })) as unknown as SortedPost[]

  const sorted = allBlogPosts.sort(
    (a: { data: BlogPostData }, b: { data: BlogPostData }) => {
      const dateA = new Date(a.data.published)
      const dateB = new Date(b.data.published)
      return dateA > dateB ? -1 : 1
    },
  )

  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug
    sorted[i].data.nextTitle = sorted[i - 1].data.title
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    sorted[i].data.prevSlug = sorted[i + 1].slug
    sorted[i].data.prevTitle = sorted[i + 1].data.title
  }

  return sorted
}

export async function getSortedMoments(): Promise<SortedMoment[]> {
  const moments = (await getCollection('moments', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })).map(moment => ({
    ...moment,
    slug: moment.id,
  })) as unknown as SortedMoment[]

  return moments.sort(
    (a, b) =>
      new Date(b.data.published).valueOf() - new Date(a.data.published).valueOf(),
  )
}

/** Homepage timeline: posts + moments, newest first */
export async function getHomeFeed(): Promise<HomeFeedItem[]> {
  const [posts, moments] = await Promise.all([
    getSortedPosts(),
    getSortedMoments(),
  ])

  const feed: HomeFeedItem[] = [
    ...posts.map(entry => ({
      type: 'post' as const,
      published: new Date(entry.data.published),
      entry,
    })),
    ...moments.map(entry => ({
      type: 'moment' as const,
      published: new Date(entry.data.published),
      entry,
    })),
  ]

  return feed.sort((a, b) => b.published.valueOf() - a.published.valueOf())
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const countMap: { [key: string]: number } = {}
  allBlogPosts.map((post: { data: { tags: string[] } }) => {
    post.data.tags.map((tag: string) => {
      if (!countMap[tag]) countMap[tag] = 0
      countMap[tag]++
    })
  })

  // sort tags
  const keys: string[] = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  return keys.map(key => ({ name: key, count: countMap[key] }))
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })
  const count: { [key: string]: number } = {}
  allBlogPosts.map((post: { data: { category: string | number } }) => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized)
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1
      return
    }
    count[post.data.category] = count[post.data.category]
      ? count[post.data.category] + 1
      : 1
  })

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  const ret: Category[] = []
  for (const c of lst) {
    ret.push({ name: c, count: count[c] })
  }
  return ret
}
