import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

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
