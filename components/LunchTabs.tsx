'use client'

import { useState } from 'react'
import type { LunchMenuItem } from '@/lib/notion'

export default function LunchTabs({ items }: { items: LunchMenuItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const current = items.find(l => l.id === activeId) ?? items[0]

  if (!current) return null

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-1 mb-8">
        {items.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveId(l.id)}
            className={`flex-1 py-3 px-4 text-sm tracking-wide transition-colors duration-200 ${
              activeId === l.id
                ? 'bg-cafe-wood text-white'
                : 'bg-white text-cafe-gray hover:bg-cafe-beige'
            }`}
          >
            {l.tabName || l.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Photo */}
        <div className="aspect-square bg-cafe-beige flex items-center justify-center overflow-hidden">
          {current.imageUrl ? (
            <img
              src={current.imageUrl}
              alt={current.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-cafe-gray text-xs tracking-widest text-center px-4">
              写真準備中
            </span>
          )}
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
