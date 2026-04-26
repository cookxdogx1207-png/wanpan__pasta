'use client'

import { useState, useMemo } from 'react'

interface Post {
  url: string
  date: string
  title?: string
  tags?: string[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function ReelsWithSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>()
    posts.forEach(p => {
      p.tags?.forEach(t => {
        tagCount.set(t, (tagCount.get(t) || 0) + 1)
      })
    })
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
  }, [posts])

  const filtered = useMemo(() => {
    const q = query.trim()
    return posts.filter(p => {
      const matchesQuery =
        !q ||
        p.title?.includes(q) ||
        p.tags?.some(t => t.includes(q))
      const matchesTag = !activeTag || p.tags?.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [posts, query, activeTag])

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cafe-gray/50 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="クリームパスタ、カルボナーラ… で検索"
          className="w-full border border-cafe-beige rounded-full pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cafe-wood/30 bg-white placeholder-cafe-gray/40"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cafe-gray/50 hover:text-cafe-dark text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              activeTag === null
                ? 'bg-cafe-wood text-white'
                : 'bg-cafe-cream text-cafe-gray hover:bg-cafe-beige'
            }`}
          >
            すべて
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                activeTag === tag
                  ? 'bg-cafe-wood text-white'
                  : 'bg-cafe-cream text-cafe-gray hover:bg-cafe-beige'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-cafe-gray mb-6 tracking-wide">
        {filtered.length} 件のレシピ動画
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-cafe-gray text-sm">
            「{query}」に一致するレシピ動画が見つかりませんでした
          </p>
          <button
            onClick={() => { setQuery(''); setActiveTag(null) }}
            className="mt-4 text-xs text-cafe-wood underline underline-offset-2"
          >
            検索をリセット
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-cafe-beige rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail area */}
              <div className="aspect-square bg-cafe-cream flex flex-col items-center justify-center gap-3">
                <svg
                  className="w-10 h-10 text-cafe-wood/40 group-hover:text-cafe-wood/60 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-[10px] tracking-[0.3em] text-cafe-gray/40 uppercase">Reel</span>
              </div>

              {/* Info */}
              <div className="p-4">
                {post.title && (
                  <h3 className="font-medium text-cafe-dark text-sm mb-3 leading-snug group-hover:text-cafe-wood transition-colors">
                    {post.title}
                  </h3>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          activeTag === tag
                            ? 'bg-cafe-wood/10 text-cafe-wood'
                            : 'bg-cafe-cream text-cafe-gray'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <time className="text-[10px] text-cafe-gray/50">
                    {post.date ? formatDate(post.date) : ''}
                  </time>
                  <span className="text-[10px] text-cafe-wood group-hover:underline underline-offset-2">
                    Instagramで見る →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
