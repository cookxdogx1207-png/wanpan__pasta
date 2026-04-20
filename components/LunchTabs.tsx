'use client'

import { useState } from 'react'

const lunches = [
  {
    id: 'monthly',
    tab: '月替わり限定ランチ',
    name: '月替わり限定ランチ',
    price: '¥1,500',
    badge: '今月の限定',
    desc: '季節の食材を使った月替わりのスペシャルランチ。\n今月は「はまぐりと菜の花のジェノベーゼ」です。',
    items: ['彩り野菜のサラダ', '自家製パン'],
    note: '※月ごとに内容が変わります',
    image: '/images/lunch-monthly.jpg',
  },
  {
    id: 'quiche',
    tab: 'キッシュプレート',
    name: 'キッシュプレートlunch',
    price: '¥1,500',
    badge: null,
    desc: 'ベーコンと旬野菜のキッシュをメインにした\n充実のプレートランチ。',
    items: [
      'ベーコンと旬野菜のキッシュ',
      '豚ロースのピカタ オーロラソース',
      '彩り野菜のサラダ',
      '小鉢・自家製パンorライス',
    ],
    note: null,
    image: '/images/lunch-quiche.jpg',
  },
  {
    id: 'pork',
    tab: 'ガジュマルランチ',
    name: 'ガジュマルlunch',
    price: '¥1,350',
    badge: '人気No.1',
    desc: 'オープン当初から変わらない、\n一番人気の自家製ポークシチューランチ。',
    items: [
      '自家製ポークシチュー',
      '自家製パンorライス',
      '彩り野菜のサラダ',
    ],
    note: null,
    image: '/images/lunch-pork.jpg',
  },
]

export default function LunchTabs() {
  const [active, setActive] = useState('monthly')
  const current = lunches.find(l => l.id === active)!

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-1 mb-8">
        {lunches.map(l => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`flex-1 py-3 px-4 text-sm tracking-wide transition-colors duration-200 ${
              active === l.id
                ? 'bg-cafe-wood text-white'
                : 'bg-white text-cafe-gray hover:bg-cafe-beige'
            }`}
          >
            {l.tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Photo */}
        <div className="aspect-square bg-cafe-beige flex items-center justify-center overflow-hidden">
          {/* 写真は public/images/ に追加してください */}
          <span className="text-cafe-gray text-xs tracking-widest text-center px-4">
            写真を追加する場合は<br />
            public/images/{current.id}.jpg<br />
            に配置してください
          </span>
        </div>

        {/* Info */}
        <div>
          {current.badge && (
            <span className="inline-block text-[10px] bg-cafe-wood text-white px-3 py-1 tracking-widest mb-3">
              {current.badge}
            </span>
          )}
          <p className="font-display text-3xl text-cafe-wood-dark mb-2">{current.name}</p>
          <p className="text-2xl text-cafe-wood font-medium mb-6">{current.price}</p>
          <p className="text-sm text-cafe-gray leading-relaxed mb-6 whitespace-pre-line">{current.desc}</p>
          <ul className="space-y-2 mb-4">
            {current.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-cafe-dark">
                <span className="text-cafe-wood mt-0.5">・</span>
                {item}
              </li>
            ))}
          </ul>
          {current.note && (
            <p className="text-xs text-cafe-gray/70 mt-4">{current.note}</p>
          )}
        </div>
      </div>
    </div>
  )
}
