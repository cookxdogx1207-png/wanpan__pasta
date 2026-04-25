import type { Metadata } from 'next'
import { getLunchMenuItems } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'メニュー | ガジュマルcafe',
}

const morningItems = [
  {
    name: 'Aセット',
    price: null,
    desc: 'ミニ食パン1枚・ヨーグルト',
    options: ['ミニ食パン1枚', 'サラダ', 'あずきホイップ'],
    note: '*ゆで卵追加 +50円',
  },
  {
    name: 'Bセット',
    price: null,
    desc: 'シフォンケーキ・ヨーグルト・ホイップクリーム',
    options: ['季節のシフォンケーキ', 'フルーツ', 'サラダ'],
    note: null,
  },
  {
    name: 'Cセット',
    price: '+350円',
    desc: 'ピザトースト・サラダ・ヨーグルト',
    options: null,
    note: null,
  },
  {
    name: 'Dセット',
    price: '+350円',
    desc: '明太マヨトースト・サラダ・ヨーグルト',
    options: null,
    note: null,
  },
  {
    name: 'Eセット',
    price: '+350円',
    desc: 'フレンチトースト3個・ホイップ・バナナ',
    options: null,
    note: '*+150円でバニラアイス追加可',
  },
]

const morningToppings = [
  { item: 'ホイップ', price: '+100円' },
  { item: 'ゆで卵', price: '+100円' },
  { item: 'あずき', price: '+100円' },
  { item: 'ヨーグルト', price: '+150円' },
  { item: 'サラダ', price: '+200円' },
  { item: 'ミニ食パン', price: '+150円' },
  { item: 'シフォンケーキ', price: '+200円' },
]

function SectionHeader({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-10">
      <p className="section-subtitle mb-2">{en}</p>
      <h2 className="section-title">{ja}</h2>
    </div>
  )
}

export default async function MenuPage() {
  const allItems = await getLunchMenuItems()
  const seasonalItem = allItems.find(item => item.seasonal)
  const lunchEatIn = allItems.filter(item => item.category === '店内')
  const lunchTakeout = allItems.filter(item => item.category === 'テイクアウト')

  return (
    <div className="pt-16">
      {/* Page hero */}
      <div className="bg-cafe-cream py-16 text-center px-4">
        <p className="section-subtitle mb-3">MENU</p>
        <h1 className="section-title">メニュー</h1>
        <p className="text-xs text-cafe-gray mt-4 tracking-widest">値段は全て税込表示です</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">

        {/* モーニング */}
        <section>
          <SectionHeader en="MORNING" ja="モーニング" />
          <p className="text-sm text-cafe-gray mb-8 pb-6 border-b border-cafe-beige">
            お好みのドリンクに、5つのモーニングセットの中からお選びください。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {morningItems.map(item => (
              <div key={item.name} className="bg-white border border-cafe-beige p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-medium text-cafe-dark tracking-wide">{item.name}</p>
                  {item.price && (
                    <span className="text-sm text-cafe-wood">{item.price}</span>
                  )}
                </div>
                <p className="text-sm text-cafe-gray mb-2">{item.desc}</p>
                {item.options && (
                  <p className="text-xs text-cafe-gray/70">
                    下からお好きなものを1つ：{item.options.join(' / ')}
                  </p>
                )}
                {item.note && (
                  <p className="text-xs text-cafe-wood mt-2">{item.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-cafe-beige/50 p-6">
            <p className="text-xs tracking-widest text-cafe-gray mb-4">トッピング</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {morningToppings.map(t => (
                <div key={t.item} className="flex justify-between text-sm">
                  <span className="text-cafe-dark">{t.item}</span>
                  <span className="text-cafe-wood">{t.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 今週のランチ */}
        <section>
          <SectionHeader en="WEEKLY LUNCH" ja="今週のランチ" />

          {/* 季節限定 */}
          {seasonalItem && (
            <div className="bg-cafe-green text-white p-6 mb-8">
              {seasonalItem.period && (
                <p className="text-xs tracking-widest text-white/60 mb-2">{seasonalItem.period}</p>
              )}
              <p className="font-display text-2xl mb-1">{seasonalItem.name}</p>
              <p className="text-cafe-wood-light font-medium mb-4">{seasonalItem.price}</p>
              <ul className="text-sm text-white/80 space-y-1">
                {seasonalItem.items.map((item, i) => (
                  <li key={i}>・ {item}</li>
                ))}
              </ul>
              {seasonalItem.desc && (
                <p className="text-xs text-white/60 mt-4 leading-relaxed whitespace-pre-line">
                  {seasonalItem.desc}
                </p>
              )}
            </div>
          )}

          <h3 className="text-sm tracking-widest text-cafe-gray mb-6 pb-3 border-b border-cafe-beige">
            ■ 店内飲食
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {lunchEatIn.map(item => (
              <div key={item.id} className="bg-white border border-cafe-beige p-6 relative">
                {item.badge && (
                  <span className="absolute top-3 right-3 text-[10px] bg-cafe-wood text-white px-2 py-0.5 tracking-widest">
                    {item.badge}
                  </span>
                )}
                <p className="font-display text-xl text-cafe-wood-dark mb-1">{item.name}</p>
                <p className="text-cafe-wood font-medium mb-4">{item.price}</p>
                <ul className="space-y-1">
                  {item.items.map((i, idx) => (
                    <li key={idx} className="text-xs text-cafe-gray">・ {i}</li>
                  ))}
                </ul>
                {item.note && (
                  <p className="text-xs text-red-500 mt-3">{item.note}</p>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-sm tracking-widest text-cafe-gray mb-6 pb-3 border-b border-cafe-beige">
            ■ テイクアウト
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {lunchTakeout.map(item => (
              <div key={item.id} className="bg-white border border-cafe-beige p-6">
                <p className="font-display text-xl text-cafe-wood-dark mb-1">{item.name}</p>
                <p className="text-cafe-wood font-medium mb-4">{item.price}</p>
                <ul className="space-y-1">
                  {item.items.map((i, idx) => (
                    <li key={idx} className="text-xs text-cafe-gray">・ {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ドリンク・デザートセット */}
        <section>
          <SectionHeader en="SET" ja="セットメニュー" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-cafe-green text-white p-6">
              <p className="text-xs tracking-widest text-white/60 mb-2">DRINK SET</p>
              <p className="font-display text-2xl mb-2">ドリンクセット</p>
              <p className="text-cafe-wood-light font-medium mb-4">ドリンク代より 250円引き</p>
              <p className="text-sm text-white/80">
                500円のドリンクが対象です。<br />
                差額支払いでその他のドリンクもOK！
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-cafe-beige p-6">
                <p className="text-xs tracking-widest text-cafe-gray mb-2">TODAY'S DESSERT SET</p>
                <p className="font-display text-xl text-cafe-wood-dark mb-1">本日のデザートセット</p>
                <p className="text-cafe-wood font-medium mb-4">¥300</p>
                <ul className="text-xs text-cafe-gray space-y-1">
                  <li>・ いちごシフォンと紅茶アイス</li>
                  <li>・ いちご尽くしのプチパフェ</li>
                  <li>・ 焼きプリンとバニラアイス</li>
                </ul>
              </div>
              <div className="bg-white border border-cafe-beige p-6">
                <p className="text-xs tracking-widest text-cafe-gray mb-2">DESSERT & DRINK</p>
                <p className="font-display text-xl text-cafe-wood-dark mb-1">デザート&ドリンクセット</p>
                <p className="text-cafe-wood font-medium">¥500</p>
              </div>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-cafe-gray/60 tracking-widest border-t border-cafe-beige pt-8">
          メニューは週替わりで変わります。最新情報はInstagramをご確認ください。
        </p>
      </div>
    </div>
  )
}
