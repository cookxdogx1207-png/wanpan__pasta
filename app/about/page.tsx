import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '自己紹介 | ガジュマルcafe',
  description: 'ガジュマルcafeのオーナー・スタッフ紹介ページです。',
}

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 px-4 text-center">
        <p className="section-subtitle mb-3">ABOUT</p>
        <h1 className="section-title">自己紹介</h1>
      </section>

      {/* Owner intro */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[3/4] bg-cafe-beige flex items-center justify-center">
            <span className="text-cafe-gray text-sm tracking-widest">オーナー写真</span>
          </div>
          <div>
            <p className="section-subtitle mb-3">OWNER</p>
            <h2 className="section-title mb-2">オーナー</h2>
            <p className="text-cafe-wood text-sm tracking-widest mb-6 font-display italic">Gajumaru Cafe</p>
            <div className="space-y-4 text-cafe-gray text-sm leading-relaxed">
              <p>
                はじめまして。ガジュマルcafeのオーナーです。
              </p>
              <p>
                「子どもと一緒に、ゆっくりと。」というコンセプトのもと、
                2020年に愛知県大治町にこのカフェをオープンしました。
              </p>
              <p>
                小さなお子様連れのご家族が、気兼ねなくゆったりと過ごせる空間を
                つくりたいという想いから、広々としたキッズスペースを設けています。
              </p>
              <p>
                食材は地元の生産者からできる限り仕入れ、
                素材の味を大切にした手作りのお料理をご提供しています。
                人気No.1のガジュマルランチをはじめ、
                季節ごとの特別メニューもお楽しみください。
              </p>
              <p>
                ナチュラルウッドに囲まれた温かな空間で、
                皆さまのお越しをお待ちしております。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cafe story */}
      <section className="py-20 bg-cafe-cream px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-subtitle mb-3">OUR STORY</p>
          <h2 className="section-title mb-10">カフェについて</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8">
              <p className="font-display text-4xl text-cafe-wood-dark mb-4">01</p>
              <h3 className="text-sm tracking-widest text-cafe-dark mb-3">空間づくり</h3>
              <p className="text-cafe-gray text-sm leading-relaxed">
                古材や無垢材を取り入れたナチュラルな内装。
                子どもも大人も居心地よく過ごせる空間にこだわりました。
              </p>
            </div>
            <div className="bg-white p-8">
              <p className="font-display text-4xl text-cafe-wood-dark mb-4">02</p>
              <h3 className="text-sm tracking-widest text-cafe-dark mb-3">食へのこだわり</h3>
              <p className="text-cafe-gray text-sm leading-relaxed">
                地元産の野菜や旬の食材を使った、
                体にやさしい手作りメニューをご提供しています。
              </p>
            </div>
            <div className="bg-white p-8">
              <p className="font-display text-4xl text-cafe-wood-dark mb-4">03</p>
              <h3 className="text-sm tracking-widest text-cafe-dark mb-3">キッズスペース</h3>
              <p className="text-cafe-gray text-sm leading-relaxed">
                安全で楽しいキッズスペースを完備。
                お子様が遊んでいる間、ご両親にもゆっくりしていただけます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">STAFF</p>
          <h2 className="section-title">スタッフ紹介</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { role: 'オーナー / シェフ', name: 'スタッフA', desc: '料理担当。地元の食材を使ったメニュー開発を日々楽しんでいます。' },
            { role: 'ホールスタッフ', name: 'スタッフB', desc: '笑顔でお迎えします。お子様連れのお客様のサポートもお任せください。' },
            { role: 'ホールスタッフ', name: 'スタッフC', desc: 'コーヒーが大好き。ドリンクメニューの充実に力を入れています。' },
          ].map((s) => (
            <div key={s.name} className="text-center">
              <div className="w-32 h-32 rounded-full bg-cafe-beige mx-auto mb-4 flex items-center justify-center">
                <span className="text-cafe-gray text-xs tracking-widest">写真</span>
              </div>
              <p className="text-xs tracking-[0.2em] text-cafe-gray mb-1">{s.role}</p>
              <p className="text-cafe-dark text-sm font-medium mb-3">{s.name}</p>
              <p className="text-cafe-gray text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
