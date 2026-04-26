'use client'

import { useState, useMemo, useEffect } from 'react'
import Script from 'next/script'

interface Post {
  url: string
  date: string
  title: string
  tags: string[]
}

export default function ReelsSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }, [posts, query])

  useEffect(() => {
    if (scriptLoaded && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  }, [filtered, scriptLoaded])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach(p => p.tags.forEach(t => set.add(t)))
    return Array.from(set)
  }, [posts])

  return (
    <>
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          setScriptLoaded(true)
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process()
          }
        }}
      />

      {/* Search input */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="レシピ名・材料・タグで検索..."
          className="w-full border border-cafe-beige rounded px-4 py-2.5 text-sm text-cafe-dark placeholder-cafe-gray focus:outline-none focus:border-cafe-wood bg-white"
        />
      </div>

      {/* Tag shortcuts */}
      {!query && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 text-xs tracking-widest rounded-full border border-cafe-beige text-cafe-gray hover:border-cafe-wood hover:text-cafe-wood transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {query && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-cafe-gray">
            「{query}」の検索結果: {filtered.length}件
          </p>
          <button
            onClick={() => setQuery('')}
            className="text-xs text-cafe-wood underline underline-offset-2"
          >
            クリア
          </button>
        </div>
      )}

      {/* Posts */}
      {filtered.length === 0 ? (
        <p className="text-center text-cafe-gray text-sm py-16">
          該当する動画が見つかりませんでした。
        </p>
      ) : (
        <div className="space-y-10">
          {filtered.map((post, i) => (
            <div key={i}>
              <div className="mb-3">
                <h2 className="font-medium text-cafe-dark text-sm">{post.title}</h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {post.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-[11px] text-cafe-wood hover:underline"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <blockquote
                  className="instagram-media w-full"
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{ maxWidth: 540, minWidth: 326, width: '100%' }}
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cafe-wood underline"
                  >
                    Instagramで見る
                  </a>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
