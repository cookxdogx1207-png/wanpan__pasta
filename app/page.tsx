import Link from 'next/link'
import HeroSlideshow from '@/components/HeroSlideshow'
import LunchTabs from '@/components/LunchTabs'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden pt-16">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

        <div className="relative z-20 text-center text-white px-4">
          <p className="text-xs tracking-[0.5em] text-white/60 mb-6 font-light">愛知県 大治町</p>
          <h1 className="font-display text-6xl md:text-8xl tracking-[0.15em] mb-4">
            ガジュマル
          </h1>
          <p className="font-display text-4xl md:text-5xl tracking-[0.2em] mb-8 text-cafe-wood-light italic">
            cafe
          </p>
          <p className="text-sm md:text-base font-light tracking-widest text-white/80 mb-12">
            子どもと一緒に、ゆっくりと。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu" className="btn-primary">
              MENU を見る
            </Link>
            <Link href="/access" className="btn-outline border-white text-white hover:bg-white hover:text-cafe-dark">
              ACCESS
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Concept */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <p className="section-subtitle mb-3">CONCEPT</p>
        <h2 className="section-title mb-8">くつろぎの空間</h2>
        <p className="text-cafe-gray leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          愛知県大治町にある、ナチュラルウッドに包まれたカフェ。キッズスペースを完備し、お子様を遊ばせながらゆっくりとお食事やお茶の時間をお楽しみいただけます。オープン当初から人気No.1のガジュマルランチをぜひご賞味ください。
        </p>
      </section>

      {/* Lunch menu tabs */}
      <section className="py-20 bg-cafe-cream">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">LUNCH MENU</p>
            <h2 className="section-title">ランチメニュー</h2>
          </div>
          <LunchTabs />
          <div className="text-center mt-10">
            <Link href="/menu" className="btn-primary">
              全メニューを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Kids space */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-cafe-beige flex flex-col items-center justify-center gap-4 text-cafe-gray/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
            </svg>
            <span className="text-xs tracking-[0.3em]">写真準備中</span>
          </div>
          <div>
            <p className="section-subtitle mb-3">KIDS SPACE</p>
            <h2 className="section-title mb-6">キッズスペース完備</h2>
            <p className="text-cafe-gray text-sm leading-relaxed mb-8">
              お子様が安心して遊べるキッズスペースを用意しています。<br />
              小さなお子様連れのご家族も、ゆっくりとお食事をお楽しみください。
            </p>
            <Link href="/access" className="btn-outline">
              店舗情報を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-cafe-cream">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="section-subtitle mb-3">INSTAGRAM</p>
          <h2 className="section-title mb-6">最新情報はInstagramで</h2>
          <p className="text-cafe-gray text-sm mb-8">@banyan0409</p>
          <a
            href="https://www.instagram.com/banyan0409"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Instagramを見る
          </a>
        </div>
      </section>
    </>
  )
}
