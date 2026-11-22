# Regenerate the link-preview card: python3 scripts/og.py .  (macOS; needs Pillow)
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps
root=sys.argv[1]; W,H=1200,630
# background: dark palette blobs, blurred, then pixelated like the live site
bg=Image.new('RGB',(W,H),'#000')
d=ImageDraw.Draw(bg)
for (x,y,r,c) in [(1020,80,420,'#24336e'),(820,40,300,'#452f63'),(1120,330,320,'#58294e'),(900,250,240,'#674416'),(700,-60,260,'#1f3280')]:
    d.ellipse((x-r,y-r,x+r,y+r),fill=c)
bg=bg.filter(ImageFilter.GaussianBlur(120))
bg=bg.resize((W//30,H//30),Image.BILINEAR).resize((W,H),Image.NEAREST)
d=ImageDraw.Draw(bg)
font=lambda s,w: ImageFont.truetype('/System/Library/Fonts/SFNS.ttf',s)
def f(size,weight):
    ft=ImageFont.truetype('/System/Library/Fonts/SFNS.ttf',size)
    ft.set_variation_by_axes([100, min(96,size), 400, weight])
    return ft
ghost=Image.open(f'{root}/public/ghost.gif').convert('RGBA').resize((150,150),Image.NEAREST)
bg.paste(ghost,(70,70),ghost)
d.text((80,250),'Dani',font=f(150,700),fill='#fff')
d.text((84,430),'a networking guy who codes.',font=f(52,600),fill='#fff')
d.text((84,530),'0xdanis.com',font=f(32,500),fill=(235,235,245))
bg.save(f'{root}/public/og.png',optimize=True)
