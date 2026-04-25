'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { RecipeItem } from '@/lib/notion'

const CATEGORIES = ['すべて', 'ランチ', 'モーニング', 'テイクアウト', 'キッズ', 'ドリンク', 'スイーツ']

export default function RecipeSearch({ recipes }: { recipes: RecipeItem[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('すべて')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return recipes.filter(r => {
      const matchCategory = category === 'すべて' || r.category === category
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.toLowerCase().includes(q)
      return matchCategory && matchQuery
    })
  }, [recipes, query, category])

  function handleRefresh() {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6 flex gap-3">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="レシピ名・材料で検索..."
          className="flex-1 border border-cafe-beige rounded px-4 py-2.5 text-sm text-cafe-dark placeholder-cafe-gray focus:outline-none focus:border-cafe-wood bg-white"
        />
        <button
          onClick={handleRefresh}
          disabled={isPending}
          className="px-4 py-2.5 text-xs tracking-widest border border-cafe-beige rounded text-cafe-gray hover:border-cafe-wood hover:text-cafe-wood transition-colors disabled:opacity-40"
        >
          {isPending ? '更新中...' : '更新'}
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 text-xs tracking-widest rounded-full border transition-colors ${
              category === cat
                ? 'bg-cafe-wood text-white border-cafe-wood'
                : 'border-cafe-beige text-cafe-gray hover:border-cafe-wood hover:text-cafe-wood'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-center text-cafe-gray text-sm py-16">
          該当するレシピが見つかりませんでした。
        </p>
      ) : (
        <ul className="divide-y divide-cafe-beige">
          {filtered.map(recipe => (
            <li key={recipe.id} className="py-6">
              <button
                className="w-full text-left"
                onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {recipe.category && (
                      <span className="inline-block text-[10px] tracking-widest text-cafe-wood border border-cafe-wood/40 px-2 py-0.5 rounded-full mb-2">
                        {recipe.category}
                      </span>
                    )}
                    <h2 className="font-medium text-cafe-dark text-base leading-snug">{recipe.title}</h2>
                    {recipe.cookingTime && (
                      <p className="text-xs text-cafe-gray mt-1">調理時間: {recipe.cookingTime}</p>
                    )}
                  </div>
                  <span className="text-cafe-gray text-lg flex-shrink-0 mt-1">
                    {expanded === recipe.id ? '−' : '+'}
                  </span>
                </div>
                {recipe.description && (
                  <p className="text-sm text-cafe-gray mt-2 leading-relaxed text-left">{recipe.description}</p>
                )}
              </button>

              {expanded === recipe.id && (
                <div className="mt-5 space-y-5 bg-cafe-cream/60 rounded p-5">
                  {recipe.ingredients && (
                    <div>
                      <h3 className="text-xs tracking-widest text-cafe-wood mb-2">材料</h3>
                      <p className="text-sm text-cafe-dark leading-relaxed whitespace-pre-line">{recipe.ingredients}</p>
                    </div>
                  )}
                  {recipe.steps && (
                    <div>
                      <h3 className="text-xs tracking-widest text-cafe-wood mb-2">作り方</h3>
                      <p className="text-sm text-cafe-dark leading-relaxed whitespace-pre-line">{recipe.steps}</p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-cafe-gray/60 text-center mt-10">
        データは1時間ごとに自動更新されます
      </p>
    </div>
  )
}
