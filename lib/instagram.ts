export interface InstagramPost {
  url: string
  date: string
  title: string
  tags: string[]
  thumbnailUrl?: string
}

function parseCaption(caption: string): { title: string; tags: string[] } {
  const hashtags = caption.match(/#[\w぀-鿿＀-￯]+/g) ?? []
  const tags = hashtags.map(t => t.slice(1))

  const beforeFirstTag = caption.split('#')[0]
  const firstLine = beforeFirstTag.split('\n').find(l => l.trim())?.trim() ?? ''
  const title = firstLine.slice(0, 60) || caption.slice(0, 60)

  return { title, tags }
}

async function fetchAllMedia(token: string): Promise<any[]> {
  const fields = 'id,caption,media_type,thumbnail_url,permalink,timestamp'
  let url: string | null =
    `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=50&access_token=${token}`
  const all: any[] = []

  while (url) {
    const res: Response = await fetch(url)
    if (!res.ok) break
    const json = await res.json()
    all.push(...(json.data ?? []))
    url = json.paging?.next ?? null
  }

  return all
}

export async function getInstagramReels(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  try {
    const media = await fetchAllMedia(token)
    return media
      .filter(m => m.media_type === 'REEL' || m.media_type === 'VIDEO')
      .map(m => {
        const { title, tags } = parseCaption(m.caption ?? '')
        return {
          url: m.permalink,
          date: (m.timestamp ?? '').slice(0, 10),
          title,
          tags,
          thumbnailUrl: m.thumbnail_url,
        }
      })
  } catch {
    return []
  }
}
