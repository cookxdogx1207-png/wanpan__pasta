import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'アクセス | ガジュマルcafe',
}

export default function AccessPage() {
  return (
    <div className="pt-16">
      <div className="bg-cafe-cream py-16 text-center px-4">
        <p className="section-subtitle mb-3">ACCESS</p>
        <h1 className="section-title">アクセス</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-cafe-gray mb-3">SHOP INFO</p>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-cafe-beige">
                  {[
                    { label: '店名', value: 'ガジュマルcafe' },
                    { label: '住所', value: '愛知県海部郡大治町\n（詳細住所は追加予定）' },
                    { label: '電話', value: '（追加予定）' },
                    { label: '営業時間', value: '（追加予定）' },
                    { label: '定休日', value: '不定休（カレンダーをご確認ください）' },
                    { label: 'Instagram', value: '@banyan0409' },
                  ].map(row => (
                    <tr key={row.label}>
                      <td className="py-3 pr-4 text-cafe-gray whitespace-nowrap w-24">{row.label}</td>
                      <td className="py-3 text-cafe-dark whitespace-pre-line">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-cafe-gray mb-3">PARKING</p>
              <p className="text-sm text-cafe-gray">駐車場あり</p>
            </div>

            <a
              href="https://www.instagram.com/banyan0409"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-block"
            >
              Instagramで最新情報を確認
            </a>
          </div>

          {/* Map */}
          <div>
            <p className="text-xs tracking-[0.3em] text-cafe-gray mb-3">MAP</p>
            <div className="aspect-square bg-cafe-beige flex items-center justify-center">
              {/* Googleマップ埋め込み — 住所確定後に差し替え */}
              <div className="text-center text-cafe-gray text-xs space-y-2 px-4">
                <p>Googleマップ</p>
                <p className="text-[11px] leading-relaxed">
                  住所が確定したら<br />
                  ここにGoogleマップが表示されます
                </p>
              </div>
            </div>
            <p className="text-xs text-cafe-gray/50 mt-2 text-center">
              ※ 住所確定後、Googleマップを埋め込みます
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
