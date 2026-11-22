# Regenerate the link-preview cards: python3 scripts/og.py .  (macOS; needs Pillow with raqm, run npm install first)
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont
root=sys.argv[1]; W,H=1200,630
SF='/System/Library/Fonts/SFNS.ttf'
VAZIR=f'{root}/node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2'
def sf(size,weight):
    ft=ImageFont.truetype(SF,size); ft.set_variation_by_axes([100, min(96,size), 400, weight]); return ft
def vazir(size,weight):
    ft=ImageFont.truetype(VAZIR,size); ft.set_variation_by_axes([weight]); return ft

def card(rtl):
    # background: dark palette blobs, blurred, then pixelated like the live site
    bg=Image.new('RGB',(W,H),'#000'); d=ImageDraw.Draw(bg)
    for (x,y,r,c) in [(1020,80,420,'#24336e'),(820,40,300,'#452f63'),(1120,330,320,'#58294e'),(900,250,240,'#674416'),(700,-60,260,'#1f3280')]:
        if rtl: x=W-x  # glow sits behind the start edge's opposite side
        d.ellipse((x-r,y-r,x+r,y+r),fill=c)
    bg=bg.filter(ImageFilter.GaussianBlur(120))
    bg=bg.resize((W//30,H//30),Image.BILINEAR).resize((W,H),Image.NEAREST)
    d=ImageDraw.Draw(bg)
    ghost=Image.open(f'{root}/public/ghost.gif').convert('RGBA').resize((150,150),Image.NEAREST)
    bg.paste(ghost,(W-70-150 if rtl else 70,70),ghost)
    if rtl:
        # anchor 'r*' = right-aligned at x; raqm handles shaping and direction
        d.text((W-80,330),'دنی',font=vazir(150,800),fill='#fff',anchor='rs',direction='rtl')
        d.text((W-84,470),'یه شبکه‌باز که کد می‌نویسه',font=vazir(52,600),fill='#fff',anchor='rs',direction='rtl')
        d.text((W-84,565),'0xdanis.com/fa',font=sf(32,500),fill=(235,235,245),anchor='rs')
        bg.save(f'{root}/public/og-fa.png',optimize=True)
    else:
        d.text((80,250),'Dani',font=sf(150,700),fill='#fff')
        d.text((84,430),'a networking guy who codes.',font=sf(52,600),fill='#fff')
        d.text((84,530),'0xdanis.com',font=sf(32,500),fill=(235,235,245))
        bg.save(f'{root}/public/og.png',optimize=True)

card(False); card(True)
