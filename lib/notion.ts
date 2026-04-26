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

export interface RecipeItem {
  id: string
  title: string
  category: string
  description: string
  ingredients: string
  steps: string
  cookingTime: string
  imageUrl: string
}

export interface ReelPost {
  url: string
  date: string
  title: string
  tags: string[]
  thumbnailUrl?: string
}

export async function getReelPosts(): Promise<ReelPost[]> {
  if (!process.env.NOTION_REELS_DB_ID || !process.env.NOTION_TOKEN) {
    return []
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_REELS_DB_ID,
      sorts: [{ property: '日付', direction: 'descending' }],
      filter: { property: '公開', checkbox: { equals: true } },
    })

    return response.results.map((page: any) => ({
      url: page.properties['URL']?.url ?? '',
      date: page.properties['日付']?.date?.start ?? '',
      title: page.properties['タイトル']?.title?.[0]?.plain_text ?? '',
      tags: (page.properties['タグ']?.multi_select ?? []).map((t: any) => t.name),
      thumbnailUrl: page.properties['サムネイルURL']?.url ?? undefined,
    }))
  } catch {
    return []
  }
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

export async function getRecipeItems(): Promise<RecipeItem[]> {
  if (!process.env.NOTION_RECIPE_DB_ID || !process.env.NOTION_TOKEN) {
    return getSampleRecipes()
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_RECIPE_DB_ID,
      sorts: [{ property: 'タイトル', direction: 'ascending' }],
      filter: { property: '公開', checkbox: { equals: true } },
    })

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties['タイトル']?.title?.[0]?.plain_text ?? '',
      category: page.properties['カテゴリ']?.select?.name ?? '',
      description: page.properties['説明']?.rich_text?.[0]?.plain_text ?? '',
      ingredients: page.properties['材料']?.rich_text?.[0]?.plain_text ?? '',
      steps: page.properties['手順']?.rich_text?.[0]?.plain_text ?? '',
      cookingTime: page.properties['調理時間']?.rich_text?.[0]?.plain_text ?? '',
      imageUrl: page.properties['画像URL']?.url ?? '',
    }))
  } catch {
    return getSampleRecipes()
  }
}

function getSampleRecipes(): RecipeItem[] {
  return [
    {
      id: '1',
      title: 'ガジュマルランチ 豚の角煮風スタイル',
      category: 'ランチ',
      description: '当店人気No.1のランチメニュー。じっくり煮込んだ豚バラとライスのセットです。',
      ingredients: '豚バラ肉 300g, 醤油 大さじ3, みりん 大さじ2, 砂糖 大さじ1, 生姜 1かけ, ごぼう 1本',
      steps: '1. 豚バラ肉を一口大に切る\n2. 鍋に油を熱し、肉を炒める\n3. 調味料を加えて弱火で40分煮込む\n4. ごぼうを加えてさらに10分煮る',
      cookingTime: '約60分',
      imageUrl: '',
    },
    {
      id: '2',
      title: 'はまぐりと菜の花のジェノベーゼ',
      category: 'ランチ',
      description: '3・4月限定の春の味覚。はまぐりの旨みと菜の花の苦みが絶妙にマッチ。',
      ingredients: 'パスタ 100g, はまぐり 8個, 菜の花 1束, バジルソース 大さじ2, にんにく 1片, オリーブオイル 大さじ2',
      steps: '1. はまぐりをあさり、砂抜きしておく\n2. にんにくを炒め、はまぐりを加え白ワインで蒸す\n3. パスタを茹でる\n4. バジルソースと絡めて菜の花をのせる',
      cookingTime: '約20分',
      imageUrl: '',
    },
    {
      id: '3',
      title: 'モーニング Aセット トースト',
      category: 'モーニング',
      description: '定番のモーニングセット。厚切りトーストとゆで卵、サラダのセット。',
      ingredients: '食パン（厚切り）1枚, バター 適量, 卵 1個, ミニサラダ 適量',
      steps: '1. パンをトースターで焼く\n2. 卵をゆでる（半熟7分）\n3. サラダを盛り付ける\n4. プレートにまとめて盛り付ける',
      cookingTime: '約10分',
      imageUrl: '',
    },
    {
      id: '4',
      title: 'モーニング Bセット ガジュマルサンド',
      category: 'モーニング',
      description: '具だくさんのサンドイッチモーニング。たまごサラダとハムのサンドです。',
      ingredients: '食パン 2枚, 卵 2個, ハム 2枚, マヨネーズ 大さじ1, 塩こしょう 少々, レタス 1枚',
      steps: '1. ゆで卵を作りつぶしてマヨネーズで和える\n2. パンにレタス、ハム、たまごサラダをはさむ\n3. 斜め半分に切ってプレートに盛る',
      cookingTime: '約15分',
      imageUrl: '',
    },
    {
      id: '5',
      title: 'キッズプレート お子様ランチ',
      category: 'キッズ',
      description: 'お子様に大人気！ミニハンバーグとポテト、フルーツの彩り豊かなプレート。',
      ingredients: 'ひき肉 150g, たまねぎ 1/4個, 卵 1個, パン粉 大さじ2, ポテト 1個, ミニトマト 3個',
      steps: '1. ひき肉とたまねぎ、調味料を混ぜてこねる\n2. 成形してフライパンで焼く\n3. ポテトをフライにする\n4. カラフルに盛り付ける',
      cookingTime: '約30分',
      imageUrl: '',
    },
    {
      id: '6',
      title: 'ガジュマルドリンク ほうじ茶ラテ',
      category: 'ドリンク',
      description: '自家製ほうじ茶シロップを使ったやさしい甘さのラテ。温・冷選べます。',
      ingredients: 'ほうじ茶 大さじ2, 牛乳 200ml, はちみつ 小さじ2, 熱湯 50ml',
      steps: '1. ほうじ茶を熱湯で濃く抽出する\n2. はちみつを加えてよく溶かす\n3. 温めた牛乳と合わせる\n4. 冷たい場合は氷を加える',
      cookingTime: '約5分',
      imageUrl: '',
    },
  ]
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
