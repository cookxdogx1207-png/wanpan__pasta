import type { Metadata } from 'next'
import { getHolidayDates } from '@/lib/notion'
import CalendarView from '@/components/CalendarView'

export const metadata: Metadata = {
  title: '営業カレンダー | ガジュマルcafe',
}

export const revalidate = 3600

export default async function CalendarPage() {
  const holidays = await getHolidayDates()

  return (
    <div className="pt-16">
      <div className="bg-cafe-cream py-16 text-center px-4">
        <p className="section-subtitle mb-3">CALENDAR</p>
        <h1 className="section-title">営業カレンダー</h1>
        <p className="text-xs text-cafe-gray mt-4 tracking-widest">不定休のため、ご来店前にご確認ください</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <CalendarView holidays={holidays} />

        <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-400 inline-block" />
            <span className="text-cafe-gray text-xs">定休日・臨時休業</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-cafe-green inline-block" />
            <span className="text-cafe-gray text-xs">営業日</span>
          </div>
        </div>

        <div className="mt-12 bg-cafe-beige/50 p-6 text-sm text-cafe-gray leading-relaxed">
          <p className="font-medium text-cafe-dark mb-2">ご注意ください</p>
          <ul className="space-y-1 text-xs">
            <li>・ 定休日は不定休です。カレンダーで毎週更新しています。</li>
            <li>・ 急な変更の場合はInstagramでお知らせします。</li>
            <li>・ ランチの予約はInstagramのDMよりお気軽にどうぞ。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
