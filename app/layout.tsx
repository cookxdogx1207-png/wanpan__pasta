import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ガジュマルcafe | 愛知県大治町',
  description: 'キッズスペースあり。お子様を遊ばせながらゆっくりとしたお食事やお茶の時間を過ごしていただけます。愛知県大治町のナチュラルカフェ。',
  keywords: 'ガジュマルcafe, 大治町, カフェ, ランチ, キッズスペース, 愛知県',
  openGraph: {
    title: 'ガジュマルcafe',
    description: 'キッズスペースあり。お子様と一緒にゆったり過ごせるナチュラルカフェ。',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
