from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]

GROUPS = [
    (ROOT / 'public/images/gallery', ROOT / 'public/images/optimized/gallery', 1440, 80),
    (ROOT / 'public/images/moments', ROOT / 'public/images/optimized/moments', 1600, 82),
    (ROOT / 'public/images/cards', ROOT / 'public/images/optimized/cards', 900, 82),
]

for source_dir, output_dir, max_width, quality in GROUPS:
    output_dir.mkdir(parents=True, exist_ok=True)
    for source in source_dir.iterdir():
        if source.suffix.lower() not in {'.png', '.jpg', '.jpeg'}:
            continue
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert('RGB')
            if image.width > max_width:
                height = round(image.height * max_width / image.width)
                image = image.resize((max_width, height), Image.Resampling.LANCZOS)
            output = output_dir / f'{source.stem}.webp'
            image.save(output, 'WEBP', quality=quality, method=6)

# 使用用户自己的横版照片生成轻量首屏视频封面，彻底移除旧的远程占位图。
poster_source = ROOT / 'public/images/gallery/02-rose.png'
poster_output = ROOT / 'public/images/hero-poster.webp'
with Image.open(poster_source) as image:
    image = ImageOps.exif_transpose(image).convert('RGB')
    image = ImageOps.fit(image, (1600, 900), method=Image.Resampling.LANCZOS, centering=(0.5, 0.45))
    image.save(poster_output, 'WEBP', quality=80, method=6)

print('optimized media created')
