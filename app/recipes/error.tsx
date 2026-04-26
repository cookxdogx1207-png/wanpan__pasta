'use client'

export default function RecipesError() {
  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <p className="text-cafe-gray text-sm">
          レシピデータの読み込みに失敗しました。しばらくしてからページを再読み込みしてください。
        </p>
      </div>
    </div>
  )
}
