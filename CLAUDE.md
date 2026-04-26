# ガジュマルcafe Webサイト

愛知県大治町のカフェ「ガジュマルcafe」の公式サイト。Next.js 14 + Tailwind CSS + Notion API で構築。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **バックエンド**: Notion API（`@notionhq/client` v2.2.15）
- **デプロイ**: Vercel
- **言語**: TypeScript（strict モード）

## 環境変数（`.env.local` に設定）

```
NOTION_TOKEN=           # Notion インテグレーションのシークレット
NOTION_NEWS_DB_ID=      # お知らせ DB
NOTION_HOLIDAY_DB_ID=   # 定休日カレンダー DB
NOTION_RECIPE_DB_ID=    # レシピ DB
NOTION_LUNCH_DB_ID=     # ランチ（現在未使用、ハードコード）
```

環境変数が未設定の場合はすべてサンプルデータにフォールバックする。

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップ（ヒーロースライドショー、ランチタブ、キッズスペース紹介） |
| `/menu` | メニュー一覧（ハードコード） |
| `/recipes` | レシピ検索（Notion DB or サンプルデータ） |
| `/reels` | Instagramリール（`data/posts.json` から読み込み） |
| `/news` | お知らせ（Notion DB） |
| `/calendar` | 営業カレンダー（Notion DB） |
| `/access` | アクセス・店舗情報（Googleマップ埋め込み） |

## 主要コンポーネント

- `components/Header.tsx` — 固定ヘッダー、スマホハンバーガーメニュー
- `components/Footer.tsx` — フッター
- `components/HeroSlideshow.tsx` — トップのスライドショー（`public/images/` に画像を配置）
- `components/LunchTabs.tsx` — ランチメニューのタブ切り替え
- `components/CalendarView.tsx` — 定休日カレンダー（date-fns 使用）
- `components/RecipeSearch.tsx` — **クライアントサイドのレシピ検索**（useMemo でフィルタリング、API コールなし）
- `components/InstagramFeed.tsx` — Instagram 埋め込み（`data/posts.json` が空なら非表示）

## Notion データ層（`lib/notion.ts`）

- `getClient()` — Notion クライアントを lazy 生成（モジュールレベル初期化を避けるため）
- 各関数は環境変数がなければサンプルデータを返す
- エラーは try/catch で catch し、サンプルデータにフォールバック（エラーは表面化しない）

## これまでの作業履歴

1. **初期構築** — ガジュマルcafe サイト全体
2. **アクセスページ修正** — JSX 構文エラー、住所・電話・Googleマップ追加
3. **ヒーロー・ランチタブ・ヘッダー** — スライドショー、ランチタブ、ヘッダーに地名表示追加
4. **レシピ検索ページ追加** (`/recipes`) — Notion DB 連携 + クライアントサイドフィルタリング
5. **リールページ追加** (`/reels`) — Instagram 埋め込みコンポーネント
6. **APIエラー修正**（ブランチ: `claude/fix-api-error-mdiEU`）
   - `lib/notion.ts`: `process.env` をローカル変数に抽出して TypeScript 型の絞り込みを確実に
   - `lib/notion.ts`: Notion クライアントを `getClient()` 関数に変更（lazy 初期化）
   - `components/RecipeSearch.tsx`: フィルター内に null/undefined 防御を追加、更新エラー表示を追加
   - `app/recipes/error.tsx`: レシピページ用エラーバウンダリを追加

## 注意事項

- `data/posts.json` は現在空配列 `[]`。Instagram リールを表示するには URL と日付を追加する
- `public/images/` に写真ファイルがないため、ヒーローとキッズスペース欄は代替テキストが表示されている
- スクショを Claude Code に送ると長い会話では `cache_control cannot be set for empty text blocks` エラーが出る（Claude Code 自体のバグ）。その場合は新しいセッションを開始する
