'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'TOP' },
  { href: '/menu', label: 'MENU' },
  { href: '/recipes', label: 'RECIPE' },
  { href: '/news', label: 'NEWS' },
  { href: '/calendar', label: 'CALENDAR' },
  { href: '/access', label: 'ACCESS' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-cafe-beige">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-xl text-cafe-wood-dark tracking-widest">ガジュマルcafe</span>
          <span className="text-[9px] text-cafe-gray tracking-[0.3em]">愛知県 / 大治町</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.2em] transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-cafe-wood border-b border-cafe-wood pb-0.5'
                  : 'text-cafe-dark hover:text-cafe-wood'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span className={`block w-6 h-px bg-cafe-dark transition-transform duration-300 ${menuOpen ? 'translate-y-2.5 rotate-45' : ''}`} />
          <span className={`block w-6 h-px bg-cafe-dark transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-cafe-dark transition-transform duration-300 ${menuOpen ? '-translate-y-2.5 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-cafe-beige">
          <nav className="flex flex-col py-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-8 py-3 text-sm tracking-[0.2em] ${
                  pathname === link.href ? 'text-cafe-wood' : 'text-cafe-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
