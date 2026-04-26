import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'INSTAGRAM_ACCESS_TOKEN が設定されていません' }, { status: 400 })
  }

  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )
  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'トークンの更新に失敗しました', detail: data }, { status: 500 })
  }

  return NextResponse.json({
    message: 'トークンを更新しました。新しいトークンをVercelの環境変数に設定してください。',
    access_token: data.access_token,
    expires_in: data.expires_in,
  })
}
