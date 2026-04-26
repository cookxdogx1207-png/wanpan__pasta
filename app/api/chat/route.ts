import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, imageBase64, mediaType } = body as {
      text?: string
      imageBase64?: string
      mediaType?: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    }

    // Build content array, skipping empty text blocks to avoid:
    // "messages: text content blocks must be non-empty"
    const content: Anthropic.MessageParam['content'] = []

    if (imageBase64 && mediaType) {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: imageBase64,
        },
      })
    }

    // cache_control も空テキストブロックには設定不可のため同じ条件でガード:
    // "cache_control cannot be set for empty text blocks"
    if (text && text.trim() !== '') {
      content.push({ type: 'text', text })
    }

    if (content.length === 0) {
      return NextResponse.json(
        { error: 'テキストまたは画像を入力してください' },
        { status: 400 }
      )
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content }],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ response: responseText })
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
