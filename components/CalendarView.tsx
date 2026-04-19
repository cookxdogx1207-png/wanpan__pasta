'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameMonth, isToday } from 'date-fns'
import { ja } from 'date-fns/locale'
import type { HolidayDate } from '@/lib/notion'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

export default function CalendarView({ holidays }: { holidays: HolidayDate[] }) {
  const [current, setCurrent] = useState(new Date())

  const holidaySet = new Set(holidays.map(h => h.date))
  const holidayMap = new Map(holidays.map(h => [h.date, h.label]))

  const monthStart = startOfMonth(current)
  const monthEnd = endOfMonth(current)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPad = getDay(monthStart)

  return (
    <div className="bg-white border border-cafe-beige p-6 md:p-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setCurrent(subMonths(current, 1))}
          className="w-8 h-8 flex items-center justify-center text-cafe-gray hover:text-cafe-dark transition-colors"
          aria-label="前の月"
        >
          ‹
        </button>
        <h2 className="font-display text-2xl text-cafe-dark tracking-widest">
          {format(current, 'yyyy年 M月', { locale: ja })}
        </h2>
        <button
          onClick={() => setCurrent(addMonths(current, 1))}
          className="w-8 h-8 flex items-center justify-center text-cafe-gray hover:text-cafe-dark transition-colors"
          aria-label="次の月"
        >
          ›
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs py-1 tracking-wide ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-cafe-gray'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const isHoliday = holidaySet.has(dateStr)
          const holidayLabel = holidayMap.get(dateStr)
          const dayOfWeek = getDay(day)
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
          const today = isToday(day)

          return (
            <div
              key={dateStr}
              title={holidayLabel}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-sm text-sm
                ${isHoliday ? 'bg-red-100 text-red-500' : 'hover:bg-cafe-beige/40'}
                ${today ? 'ring-1 ring-cafe-wood' : ''}
                ${!isHoliday && dayOfWeek === 0 ? 'text-red-400' : ''}
                ${!isHoliday && dayOfWeek === 6 ? 'text-blue-400' : ''}
                ${!isHoliday && !isWeekend ? 'text-cafe-dark' : ''}
                cursor-default transition-colors
              `}
            >
              <span>{format(day, 'd')}</span>
              {isHoliday && (
                <span className="text-[8px] text-red-400 leading-none mt-0.5">休</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
