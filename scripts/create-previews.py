"""Regenerate checked-in 1200x630 social cards. Optional authoring dependency: Pillow."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
from pathlib import Path
import json, textwrap

root=Path(__file__).resolve().parents[1]
out=root/'public/social';out.mkdir(exist_ok=True)
projects=json.loads((root/'src/projects.json').read_text(encoding='utf-8'))
def font(size,bold=False):
    candidates=[Path('C:/Windows/Fonts/'+('arialbd.ttf' if bold else 'arial.ttf')),Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')]
    return ImageFont.truetype(str(next(p for p in candidates if p.exists())),size)
for project in projects+[dict(slug='portfolio',title='Nachiketh Ramesh',status='Technology / Strategy',accent='#c4e6ae',media=[],summary='Selected work. Ideas made tangible.')]:
    im=Image.new('RGB',(1200,630),'#0b0e0c');d=ImageDraw.Draw(im);accent=project['accent']
    d.rectangle((48,48,84,54),fill=accent)
    d.text((104,38),'NACHIKETH RAMESH / SELECTED WORK',font=font(18),fill='#b6c0b7')
    title=project['title'];lines=textwrap.wrap(title,22)
    y=150
    for line in lines:d.text((48,y),line,font=font(57,True),fill='#f1f3ef');y+=68
    for line in textwrap.wrap(project['status'].upper(),38):d.text((52,y+28),line,font=font(17),fill=accent);y+=25
    d.line((48,535,1152,535),fill='#354035',width=1)
    d.text((48,565),'nachikethramesh.com',font=font(19),fill='#b6c0b7');d.text((909,565),'EXPLORE PROJECT',font=font(17),fill=accent)
    media=next((m['url'] for m in project['media'] if m['type']=='image'),None)
    if project['slug']=='tweet-index':media='/media/tweet-index/poster.jpg'
    box=(695,120,1152,492)
    if media:
        source=Image.open(root/'public'/media.lstrip('/')).convert('RGB');source.thumbnail((457,372),Image.Resampling.LANCZOS)
        im.paste(source,(box[0]+(457-source.width)//2,box[1]+(372-source.height)//2))
        d.rectangle(box,outline='#354035',width=1)
    else:
        labels={'orbit-prm':['CONTACT','CONTEXT','FOLLOW-UP'],'commandvoice':['RECORD','TRANSCRIBE','DELIVER'],'portfolio':['BUILD','TECHNOLOGY','STRATEGY']}.get(project['slug'],['EXPLORE','UNDERSTAND','BUILD'])
        for i,label in enumerate(labels):
            top=135+i*115;d.rounded_rectangle((715,top,1140,top+85),radius=8,outline='#354035',width=2)
            d.text((740,top+28),f'0{i+1}   {label}',font=font(24),fill=accent)
    im.save(out/(project['slug']+'.jpg'),quality=90,optimize=True)
print(f'Created {len(projects) + 1} unique social cards.')
