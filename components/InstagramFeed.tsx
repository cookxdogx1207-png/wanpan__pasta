'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface Post {
  url: string
  date: string
}

export default function InstagramFeed({ posts }: { posts: Post[] }) {
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  }, [posts])

  if (posts.length === 0) {
    return (
      <p className="text-center text-cafe-gray text-sm py-16">
        まだ投稿がありません。
      </p>
    )
  }

  return (
    <>
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process()
          }
        }}
      />
      <div className="space-y-8">
        {posts.map((post, i) => (
          <div key={i} className="flex justify-center">
            <blockquote
              className="instagram-media w-full"
              data-instgrm-permalink={post.url}
              data-instgrm-version="14"
              style={{ maxWidth: 540, minWidth: 326, width: '100%' }}
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cafe-wood underline">
                Instagramで見る
              </a>
            </blockquote>
          </div>
        ))}
      </div>
    </>
  )
}
