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
                  [
                    { label: '店名', value: 'ガジュマルcafe' },
                    { label: '住所', value: '〒490-1135\n愛知県海部郡大治町鎌須賀山廻52' },
                    { label: '電話', value: '052-433-1953' },
                    { label: '営業時間', value: '8:30 〜 17:00' },
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
            <div className="w-full h-80 md:h-full md:min-h-[400px]">
              <iframe
                src="https://maps.google.com/maps?q=愛知県海部郡大治町鎌須賀山廻52&output=embed&z=16&hl=ja"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ガジュマルcafe アクセスマップ"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
