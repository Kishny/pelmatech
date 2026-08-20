"""
Generates placeholder PNG assets for the Pelmatech skeleton.
These are NOT final assets — replace with the real photography /
screenshots from qclay.design/lovable/pelmatech/ (protected original
bundle) or real product photography (new platform assets) before launch.
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets")
os.makedirs(OUT_DIR, exist_ok=True)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

SURFACE = (239, 238, 234)
MUTED = (234, 232, 227)
BORDER = (218, 216, 210)
FOREGROUND = (43, 40, 35)
ACCENT = (79, 148, 105)

# name -> (width, height, label, tint)
ASSETS = {
    # protected original bundle
    "doctor-computer": (1920, 1280, "Hero — Doctor at Computer", SURFACE),
    "blur-doctor": (900, 1200, "Dr. Helga Brooks / Dr. Aria Vance", MUTED),
    "happy-doctor": (900, 1200, "Dr. Kwame Mbeki / Dr. Hana Sato", MUTED),
    "young-doctor": (900, 1200, "Dr. Matteo Dubois", MUTED),
    "clock-lamp": (1000, 800, "Benefit — Unavailable", SURFACE),
    "pills": (1000, 800, "Benefit — Unethical", SURFACE),
    "waitlist": (1000, 800, "Benefit — Waitlist", SURFACE),
    # new platform assets
    "care-dashboard": (1400, 1000, "Care Dashboard", SURFACE),
    "telehealth": (1400, 1000, "Telehealth", SURFACE),
    "nutrition": (1400, 1000, "Nutrition", SURFACE),
    "fitness": (1400, 1000, "Fitness", SURFACE),
    "medication": (1400, 1000, "Medication", SURFACE),
    "health-data": (1400, 1000, "Health Data", SURFACE),
    "family-care": (1400, 1000, "Family Care", SURFACE),
    "doctor-consultation": (1400, 1000, "Doctor Consultation", SURFACE),
    "health-report": (1400, 1000, "Health Report", SURFACE),
    "mobile-app": (900, 1800, "Mobile App", SURFACE),
    "patient-profile": (1400, 1000, "Patient Profile", SURFACE),
    "wellness-plan": (1400, 1000, "Wellness Plan", SURFACE),
}


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def make(name, w, h, label, tint):
    img = Image.new("RGB", (w, h), tint)
    draw = ImageDraw.Draw(img)

    # subtle border
    draw.rectangle([0, 0, w - 1, h - 1], outline=BORDER, width=max(2, w // 400))

    # thin diagonal accent lines for texture
    step = max(60, w // 20)
    for x in range(-h, w, step):
        draw.line([(x, h), (x + h, 0)], fill=BORDER, width=1)

    # accent corner mark
    mark = max(24, w // 40)
    draw.rectangle([24, 24, 24 + mark, 24 + mark // 6], fill=ACCENT)

    title_font = font(FONT_BOLD, max(28, w // 22))
    sub_font = font(FONT_REG, max(16, w // 46))

    title = "PELMATECH"
    tb = draw.textbbox((0, 0), title, font=title_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    draw.text(((w - tw) / 2, h / 2 - th - 10), title, fill=FOREGROUND, font=title_font)

    sb = draw.textbbox((0, 0), label, font=sub_font)
    sw, sh = sb[2] - sb[0], sb[3] - sb[1]
    draw.text(((w - sw) / 2, h / 2 + 14), label, fill=FOREGROUND, font=sub_font)

    tag_font = font(FONT_REG, max(14, w // 60))
    tag = f"placeholder asset · {name}.png · replace before launch"
    gb = draw.textbbox((0, 0), tag, font=tag_font)
    gw = gb[2] - gb[0]
    draw.text(((w - gw) / 2, h - gb[3] - 28), tag, fill=BORDER, font=tag_font)

    img.save(os.path.join(OUT_DIR, f"{name}.png"), optimize=True)
    print(f"wrote {name}.png ({w}x{h})")


for name, (w, h, label, tint) in ASSETS.items():
    make(name, w, h, label, tint)
