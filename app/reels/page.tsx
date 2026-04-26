import type { Metadata } from 'next'
import { getReelPosts } from '@/lib/notion'
import staticPosts from '@/data/posts.json'
import ReelsWithSearch from '@/components/ReelsWithSearch'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'レシピ動画 | ガジュマルcafe',
  description: 'ガジュマルcafeのInstagramレシピ動画一覧',
}

export default async function ReelsPage() {
  const reels = await getReelPosts()
  const posts = reels.length > 0 ? reels : staticPosts

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
