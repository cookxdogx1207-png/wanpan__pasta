'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  { src: '/images/exterior.jpg', alt: '外観' },
  { src: '/images/interior1.jpg', alt: '内装' },
  { src: '/images/interior2.jpg', alt: '内装2' },
  { src: '/images/food.jpg', alt: '料理' },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            onLoad={() => {
              setLoaded(prev => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }}
            onError={() => {}}
          />
        </div>
      ))}

      {/* 背景色（写真が読み込まれる前 or 写真なしの場合） */}
      <div className="absolute inset-0 bg-cafe-dark -z-10" />

      {/* ドットナビゲーション */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-4' : 'bg-white/40'
            }`}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
