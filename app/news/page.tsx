import type { Metadata } from 'next'
import { getNewsItems } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'お知らせ | ガジュマルcafe',
}

export const revalidate = 3600

export default async function NewsPage() {
  const news = await getNewsItems()

  return (
    <div className="pt-16">
      <div className="bg-cafe-cream py-16 text-center px-4">
        <p className="section-subtitle mb-3">NEWS</p>
        <h1 className="section-title">お知らせ</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {news.length === 0 ? (
          <p className="text-center text-cafe-gray text-sm">現在お知らせはありません。</p>
        ) : (
          <ul className="divide-y divide-cafe-beige">
            {news.map(item => (
              <li key={item.id} className="py-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <time className="text-xs text-cafe-gray tracking-widest">
                    {item.date.replace(/-/g, '.')}
                  </time>
                </div>
                <h2 className="font-medium text-cafe-dark text-lg mb-3">{item.title}</h2>
                <p className="text-sm text-cafe-gray leading-relaxed whitespace-pre-line">{item.content}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 bg-cafe-beige/50 p-8 text-center">
          <p className="text-xs tracking-widest text-cafe-gray mb-4">最新情報はInstagramでも発信中</p>
          <a
            href="https://www.instagram.com/banyan0409"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            @banyan0409 をフォロー
          </a>
        </div>
      </div>
    </div>
  )
}
