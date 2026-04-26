import type { Metadata } from 'next'
import posts from '@/data/posts.json'
import ReelsSearch from '@/components/ReelsSearch'

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
          レシピ名・材料・タグで動画を検索できます
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 py-16">
        <ReelsSearch posts={posts} />
      </div>
    </div>
  )
}
