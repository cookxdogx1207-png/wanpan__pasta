import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-cafe-dark text-white/70 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-display text-2xl text-white tracking-widest mb-1">ガジュマルcafe</p>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-4">GAJUMARU CAFE</p>
            <p className="text-sm leading-relaxed">
              キッズスペースあり。<br />
              お子様と一緒にゆったり過ごせる<br />
              ナチュラルカフェです。
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-4">INFORMATION</p>
            <ul className="space-y-2 text-sm">
              <li>〒490-1135 愛知県海部郡大治町鎌須賀山廻52</li>
              <li>TEL: 052-433-1953</li>
              <li>営業時間：8:30 〜 17:00</li>
              <li>定休日：不定休</li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-4">LINKS</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/menu', label: 'メニュー' },
                { href: '/news', label: 'お知らせ' },
                { href: '/calendar', label: '営業カレンダー' },
                { href: '/access', label: 'アクセス' },
                { href: '/about', label: '自己紹介' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.instagram.com/banyan0409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/30 tracking-widest">
          © {new Date().getFullYear()} ガジュマルcafe. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
