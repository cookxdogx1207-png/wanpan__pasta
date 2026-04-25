import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export interface LunchMenuItem {
  id: string
  name: string
  tabName: string
  category: string  // "トップページ" | "店内" | "テイクアウト"
  price: string
  badge: string | null
  desc: string
  items: string[]
  note: string | null
  imageUrl: string | null
  period: string | null
  seasonal: boolean
  order: number
}

export async function getLunchMenuItems(): Promise<LunchMenuItem[]> {
  if (!process.env.NOTION_LUNCH_DB_ID || !process.env.NOTION_TOKEN) {
    return getDefaultLunchMenuItems()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_LUNCH_DB_ID,
      sorts: [{ property: '表示順', direction: 'ascending' }],
      filter: { property: '公開', checkbox: { equals: true } },
    })

    return response.results.map((page: any) => {
      const itemsText = page.properties['内容']?.rich_text?.[0]?.plain_text ?? ''
      return {
        id: page.id,
        name: page.properties['名前']?.title?.[0]?.plain_text ?? '',
        tabName: page.properties['タブ名']?.rich_text?.[0]?.plain_text ?? '',
        category: page.properties['カテゴリ']?.select?.name ?? '',
        price: page.properties['価格']?.rich_text?.[0]?.plain_text ?? '',
        badge: page.properties['バッジ']?.rich_text?.[0]?.plain_text || null,
        desc: page.properties['説明文']?.rich_text?.[0]?.plain_text ?? '',
        items: itemsText ? itemsText.split(',').map((s: string) => s.trim()) : [],
        note: page.properties['注記']?.rich_text?.[0]?.plain_text || null,
        imageUrl: page.properties['写真URL']?.url || null,
        period: page.properties['期間']?.rich_text?.[0]?.plain_text || null,
        seasonal: page.properties['季節限定']?.checkbox ?? false,
        order: page.properties['表示順']?.number ?? 0,
      }
    })
  } catch {
    return getDefaultLunchMenuItems()
  }
}

function getDefaultLunchMenuItems(): LunchMenuItem[] {
  return [
    {
      id: 'monthly',
      name: 'はまぐりと菜の花のジェノベーゼ',
      tabName: '月替わり限定ランチ',
      category: 'トップページ',
      price: '¥1,500',
      badge: '今月の限定',
      desc: '季節の食材を使った月替わりのスペシャルランチ。\n今月は「はまぐりと菜の花のジェノベーゼ」です。',
      items: ['彩り野菜のサラダ', '自家製パン'],
      note: '※月ごとに内容が変わります',
      imageUrl: '/images/lunch-monthly.jpg',
      period: '3・4月限定',
      seasonal: true,
      order: 1,
    },
    {
      id: 'quiche',
      name: 'キッシュプレートlunch',
      tabName: 'キッシュプレート',
      category: 'トップページ',
      price: '¥1,500',
      badge: null,
      desc: 'ベーコンと旬野菜のキッシュをメインにした\n充実のプレートランチ。',
      items: ['ベーコンと旬野菜のキッシュ', '豚ロースのピカタ オーロラソース', '彩り野菜のサラダ', '小鉢・自家製パンorライス'],
      note: null,
      imageUrl: '/images/lunch-quiche.jpg',
      period: null,
      seasonal: false,
      order: 2,
    },
    {
      id: 'pork',
      name: 'ガジュマルlunch',
      tabName: 'ガジュマルランチ',
      category: 'トップページ',
      price: '¥1,350',
      badge: '人気No.1',
      desc: 'オープン当初から変わらない、\n一番人気の自家製ポークシチューランチ。',
      items: ['自家製ポークシチュー', '自家製パンorライス', '彩り野菜のサラダ'],
      note: null,
      imageUrl: '/images/lunch-pork.jpg',
      period: null,
      seasonal: false,
      order: 3,
    },
    {
      id: 'eat-gaju',
      name: 'ガジュマルlunch',
      tabName: '',
      category: '店内',
      price: '¥1,350',
      badge: '人気No.1',
      desc: '',
      items: ['自家製ポークシチュー', '自家製パンorライス・彩り野菜のサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 1,
    },
    {
      id: 'eat-omelet',
      name: 'オムライスlunch',
      tabName: '',
      category: '店内',
      price: '¥1,200',
      badge: null,
      desc: '',
      items: ['ひき肉ときのこのとろふわデミグラスオムライス', '彩り野菜のサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 2,
    },
    {
      id: 'eat-pasta',
      name: 'パスタlunch',
      tabName: '',
      category: '店内',
      price: '¥1,200',
      badge: null,
      desc: '',
      items: ['シーフードと春キャベツのクリームパスタ', '自家製パン・彩り野菜のサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 3,
    },
    {
      id: 'eat-quiche',
      name: 'キッシュプレートlunch',
      tabName: '',
      category: '店内',
      price: '¥1,500',
      badge: null,
      desc: '',
      items: ['ベーコンと旬野菜のキッシュ', '豚ロースのピカタ オーロラソース', '彩り野菜のサラダ', '小鉢・自家製パンorライス'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 4,
    },
    {
      id: 'eat-hamburg',
      name: 'ハンバーグlunch',
      tabName: '',
      category: '店内',
      price: '¥1,280',
      badge: '限定',
      desc: '',
      items: ['トマト煮込みハンバーグ', 'サラダ・スープ・自家製パンorライス'],
      note: '※1日限定5食',
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 5,
    },
    {
      id: 'take-gaju',
      name: 'ガジュマル弁当',
      tabName: '',
      category: 'テイクアウト',
      price: '¥1,350',
      badge: null,
      desc: '',
      items: ['自家製ポークシチュー', '自家製パンorライス・彩り野菜のサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 1,
    },
    {
      id: 'take-hamburg',
      name: 'ハンバーグ弁当',
      tabName: '',
      category: 'テイクアウト',
      price: '¥1,280',
      badge: null,
      desc: '',
      items: ['トマト煮込みハンバーグ', '自家製パンorライス・彩り野菜のサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 2,
    },
    {
      id: 'take-quiche',
      name: 'キッシュ弁当',
      tabName: '',
      category: 'テイクアウト',
      price: '¥1,500',
      badge: null,
      desc: '',
      items: ['ベーコンと旬野菜のキッシュ', '今週のおかず・彩り野菜のサラダ', '自家製パンorライス・ペンネサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 3,
    },
    {
      id: 'take-omelet',
      name: 'オムライス弁当',
      tabName: '',
      category: 'テイクアウト',
      price: '¥1,200',
      badge: null,
      desc: '',
      items: ['今週のオムライス・彩り野菜のサラダ'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 4,
    },
    {
      id: 'take-pasta',
      name: 'パスタ弁当',
      tabName: '',
      category: 'テイクアウト',
      price: '¥1,200',
      badge: null,
      desc: '',
      items: ['今週のパスタ', '彩り野菜のサラダ・自家製パン'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 5,
    },
    {
      id: 'take-kids',
      name: 'お子さま弁当',
      tabName: '',
      category: 'テイクアウト',
      price: '¥650',
      badge: null,
      desc: '',
      items: ['ケチャップライスのオムライス', 'ハンバーグ・カップゼリー'],
      note: null,
      imageUrl: null,
      period: null,
      seasonal: false,
      order: 6,
    },
  ]
}

export interface NewsItem {
  id: string
  title: string
  date: string
  content: string
}

export interface HolidayDate {
  date: string
  label: string
}

export async function getNewsItems(): Promise<NewsItem[]> {
  if (!process.env.NOTION_NEWS_DB_ID || !process.env.NOTION_TOKEN) {
    return getSampleNews()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_NEWS_DB_ID,
      sorts: [{ property: '日付', direction: 'descending' }],
      filter: { property: '公開', checkbox: { equals: true } },
    })

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties['タイトル']?.title?.[0]?.plain_text ?? '',
      date: page.properties['日付']?.date?.start ?? '',
      content: page.properties['内容']?.rich_text?.[0]?.plain_text ?? '',
    }))
  } catch {
    return getSampleNews()
  }
}

export async function getHolidayDates(): Promise<HolidayDate[]> {
  if (!process.env.NOTION_HOLIDAY_DB_ID || !process.env.NOTION_TOKEN) {
    return []
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_HOLIDAY_DB_ID,
      sorts: [{ property: '日付', direction: 'ascending' }],
    })

    return response.results.map((page: any) => ({
      date: page.properties['日付']?.date?.start ?? '',
      label: page.properties['メモ']?.rich_text?.[0]?.plain_text ?? '定休日',
    }))
  } catch {
    return []
  }
}

function getSampleNews(): NewsItem[] {
  return [
    {
      id: '1',
      title: '4月の営業について',
      date: '2026-04-01',
      content: '4月の営業カレンダーを更新しました。不定休のためカレンダーページをご確認ください。',
    },
    {
      id: '2',
      title: '春の限定ランチはじまりました',
      date: '2026-03-15',
      content: 'はまぐりと菜の花のジェノベーゼが登場！3・4月限定メニューをぜひご賞味ください。',
    },
  ]
}
