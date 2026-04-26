import type { Metadata } from 'next'
import posts from '@/data/posts.json'
import ReelsWithSearch from '@/components/ReelsWithSearch'

export const metadata: Metadata = {
  title: 'レシピ動画 | ガジュマルcafe',
  description: 'ガジュマルcafeのInstagramレシピ動画一覧',
}

export default function ReelsPage() {
  return (
    <div className="pt-16">
      <div className="bg-cafe-cream py-16 text-center px-4">
        <p className="section-subtitle mb-3">REELS</p>
        <h1 className="section-title">レシピ動画</h1>
        <p className="mt-4 text-sm text-cafe-gray">
          Instagramに投稿したレシピ動画をまとめています
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <ReelsWithSearch posts={posts} />
      </div>
    </div>
  )
}
