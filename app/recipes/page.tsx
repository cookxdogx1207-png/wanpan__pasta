import type { Metadata } from 'next'
import { getRecipeItems } from '@/lib/notion'
import RecipeSearch from '@/components/RecipeSearch'

export const metadata: Metadata = {
  title: 'レシピ | ガジュマルcafe',
  description: 'ガジュマルcafeのレシピ一覧。カテゴリや食材から検索できます。',
}

export const revalidate = 3600

export default async function RecipesPage() {
  const recipes = await getRecipeItems()

  return (
    <div className="pt-16">
      <div className="bg-cafe-cream py-16 text-center px-4">
        <p className="section-subtitle mb-3">RECIPE</p>
        <h1 className="section-title">レシピ</h1>
        <p className="mt-4 text-sm text-cafe-gray">
          カテゴリや食材名でレシピを検索できます
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <RecipeSearch recipes={recipes} />
      </div>
    </div>
  )
}
