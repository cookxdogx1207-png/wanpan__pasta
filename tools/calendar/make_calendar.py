"""
ガジュマルcafe 営業日カレンダー作成スクリプト
=============================================
使い方：
1. このファイルをClaudeにアップロード
2. 以下を伝える：
   - 対象月（例：2026年6月）
   - 休業日の日付リスト
   - 予約不可の日付リスト＋理由
   - 背景に使いたい写真

【設定項目】※Claudeに変更してもらう部分
------------------------------------------
YEAR            = 2026
MONTH_JP        = "5月"
MONTH_EN        = "May"
MONTH_START_COL = 5        # 1日が何曜日か (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6)
DAYS_IN_MONTH   = 31       # 月の日数

CLOSED          = {3, 5, 10, 23, 28}          # 休業日
UNAVAILABLE     = {14, 15, 18}                 # 予約不可日
UNAVAIL_REASON  = "運動会予定日のため"          # 予約不可の理由

COVER_PHOTO     = "IMG_5947.jpeg"              # 表紙の背景写真ファイル名
CALENDAR_PHOTO  = "line_oa_chat_250312_103115.jpeg"  # カレンダーの背景写真ファイル名
------------------------------------------
"""

from PIL import Image, ImageDraw, ImageFont

# ═══════════════════════════════════════
#  ★ ここを毎月変更する ★
# ═══════════════════════════════════════
YEAR            = 2026
MONTH_JP        = "5月"
MONTH_EN        = "May"
MONTH_START_COL = 5        # 2026年5月1日=金曜=5
DAYS_IN_MONTH   = 31

CLOSED          = {3, 5, 10, 23, 28}
UNAVAILABLE     = {14, 15, 18}
UNAVAIL_REASON  = "運動会予定日のため"

COVER_PHOTO     = "IMG_5947.jpeg"
CALENDAR_PHOTO  = "line_oa_chat_250312_103115.jpeg"

UPLOAD_DIR      = "/mnt/user-data/uploads/"
OUTPUT_DIR      = "/mnt/user-data/outputs/"
# ═══════════════════════════════════════

W, H = 1080, 1920

NOTO_REG   = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"
NOTO_BOLD  = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
NOTO_LIGHT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Light.ttc"
SERIF_REG  = "/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc"
SERIF_BOLD = "/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc"

def fnt(p, s): return ImageFont.truetype(p, s)

WHITE      = (255, 255, 255)
OFF_WHITE  = (240, 235, 230)
ORANGE     = (196, 82, 34)
GRAY_BADGE = (105, 105, 105)
CAFE_COLOR = (210, 193, 168)
NUM_DARK   = (55, 50, 44)
SUN_COLOR  = (170, 55, 25)
SAT_COLOR  = (45, 75, 150)
DAY_HDR    = (80, 72, 62)


def build_grid():
    grid, col = [], MONTH_START_COL
    for d in range(1, DAYS_IN_MONTH + 1):
        grid.append((d, col))
        col = (col + 1) % 7
    return grid

def get_row(d_num):
    return ((d_num - 1) + MONTH_START_COL) // 7

def load_bg(filename, alpha=185, crop_top_pct=0.0):
    path = UPLOAD_DIR + filename
    img = Image.open(path).convert("RGBA")
    ow, oh = img.size
    sw = W / ow
    nw, nh = W, int(oh * sw)
    if nh < H:
        sh = H / oh
        nw, nh = int(ow * sh), H
        img = img.resize((nw, nh), Image.LANCZOS)
        left = int((nw - W) * 0.5)
        img = img.crop((left, 0, left + W, H))
    else:
        img = img.resize((nw, nh), Image.LANCZOS)
        avail = nh - H
        top = int(avail * crop_top_pct)
        img = img.crop((0, top, W, top + H))
    ov = Image.new("RGBA", (W, H), (8, 6, 3, alpha))
    return Image.alpha_composite(img, ov).convert("RGB")


# ── 表紙 ────────────────────────────────
def make_cover():
    img = load_bg(COVER_PHOTO, alpha=170, crop_top_pct=0.15)
    d = ImageDraw.Draw(img)

    d.text((W//2, 580),  str(YEAR),   font=fnt(SERIF_BOLD, 290), fill=WHITE,    anchor="mm")
    d.text((W//2, 940),  MONTH_JP,    font=fnt(SERIF_BOLD, 290), fill=WHITE,    anchor="mm")
    d.line([(160,1115),(920,1115)], fill=(190,165,135), width=2)
    d.text((W//2, 1192), "営 業 日 カ レ ン ダ ー",
           font=fnt(NOTO_LIGHT, 54), fill=OFF_WHITE, anchor="mm")
    d.text((W//2, H-130), "ガジュマルcafe",
           font=fnt(NOTO_LIGHT, 40), fill=CAFE_COLOR, anchor="mm")
    return img


# ── カレンダーグリッド ───────────────────
def make_calendar():
    img = load_bg(CALENDAR_PHOTO, alpha=148, crop_top_pct=0.3)
    d = ImageDraw.Draw(img)

    # ヘッダー
    d.text((W//2, 95),      str(YEAR),  font=fnt(SERIF_REG, 52),   fill=OFF_WHITE,     anchor="mm")
    d.text((W//2-55, 240),  MONTH_JP[0], font=fnt(SERIF_BOLD, 195), fill=WHITE,         anchor="mm")
    d.text((W//2+100, 260), MONTH_EN,   font=fnt(SERIF_REG, 100),  fill=(205,185,158), anchor="lm")

    # グリッド背景（半透明）
    GL=38; GR=W-38; GT=390; CW=(GR-GL)/7; CH=162; TOT=7; GH=CH*TOT
    gi = Image.new("RGBA",(W,H),(0,0,0,0))
    gd = ImageDraw.Draw(gi)
    gd.rounded_rectangle([GL,GT,GR,GT+GH], radius=20, fill=(252,249,244,165))
    img = Image.alpha_composite(img.convert("RGBA"), gi).convert("RGB")
    d = ImageDraw.Draw(img)

    # 曜日ヘッダー
    for i, day in enumerate(["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]):
        cx = GL+(i+0.5)*CW; cy = GT+CH*0.5
        c = SUN_COLOR if i==0 else SAT_COLOR if i==6 else DAY_HDR
        d.text((cx,cy), day, font=fnt(NOTO_REG,30), fill=c, anchor="mm")

    # グリッド線
    for r in range(1,TOT+1):
        d.line([(GL+8,GT+CH*r),(GR-8,GT+CH*r)], fill=(200,190,178), width=1)
    for c in range(1,7):
        d.line([(GL+c*CW,GT+CH),(GL+c*CW,GT+CH*TOT-8)], fill=(200,190,178), width=1)

    # 日付とバッジ
    f_n=fnt(NOTO_REG,52); f_b=fnt(NOTO_BOLD,30); f_bs=fnt(NOTO_BOLD,17)
    for d_num, col in build_grid():
        row=get_row(d_num)
        cx=GL+(col+0.5)*CW; ctop=GT+CH*(row+1)
        cy_n=ctop+CH*0.28;  cy_b=ctop+CH*0.68
        nc = SUN_COLOR if col==0 else SAT_COLOR if col==6 else NUM_DARK
        d.text((cx,cy_n), str(d_num), font=f_n, fill=nc, anchor="mm")

        if d_num in CLOSED:
            bw,bh=86,44; bx,by=int(cx-bw/2),int(cy_b-bh/2)
            d.rounded_rectangle([bx,by,bx+bw,by+bh], radius=8, fill=ORANGE)
            d.text((cx,cy_b),"休",font=f_b,fill=WHITE,anchor="mm")

        elif d_num in UNAVAILABLE:
            reason_lines = [UNAVAIL_REASON[i:i+6] for i in range(0, len(UNAVAIL_REASON), 6)]
            bw,bh=128,72; bx,by=int(cx-bw/2),int(cy_b-bh/2)
            d.rounded_rectangle([bx,by,bx+bw,by+bh], radius=8, fill=GRAY_BADGE)
            d.text((cx, cy_b-22), "予約不可",      font=f_bs, fill=WHITE,         anchor="mm")
            d.text((cx, cy_b-4),  "運動会予定日",   font=f_bs, fill=(220,220,220), anchor="mm")
            d.text((cx, cy_b+14), "のため",         font=f_bs, fill=(220,220,220), anchor="mm")

    # 凡例
    ly=GT+CH*TOT+48; f_leg=fnt(NOTO_REG,30)
    d.rounded_rectangle([60,ly,116,ly+42], radius=8, fill=ORANGE)
    d.text((88,ly+21),"休",font=fnt(NOTO_BOLD,26),fill=WHITE,anchor="mm")
    d.text((130,ly+21),"定休日",font=f_leg,fill=WHITE,anchor="lm")
    d.rounded_rectangle([430,ly,486,ly+42], radius=8, fill=GRAY_BADGE)
    d.text((458,ly+21),"×",font=fnt(NOTO_BOLD,26),fill=WHITE,anchor="mm")
    d.text((500,ly+21),"予約不可（" + UNAVAIL_REASON + "）",font=fnt(NOTO_REG,22),fill=WHITE,anchor="lm")

    d.text((W//2,H-100),"ガジュマルcafe",font=fnt(NOTO_LIGHT,38),fill=CAFE_COLOR,anchor="mm")
    return img


# ── 実行 ────────────────────────────────
month_num = MONTH_JP.replace("月","").zfill(2)

cover = make_cover()
cover_path = f"{OUTPUT_DIR}{YEAR}_{month_num}_1_cover.png"
cover.save(cover_path, "PNG")
print(f"表紙保存: {cover_path}")

cal = make_calendar()
cal_path = f"{OUTPUT_DIR}{YEAR}_{month_num}_2_calendar.png"
cal.save(cal_path, "PNG")
print(f"カレンダー保存: {cal_path}")
