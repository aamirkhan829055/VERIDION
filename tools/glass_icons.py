"""Veridion 3D glass icon set: builds an inline SVG sprite of <symbol>s.

Each icon is made of parts on a 64x64 grid:
  ('f', d)          filled glass shape (body, iridescent rim, gloss)
  ('t', d, width)   glass tube along a path (bright edges, clear core, highlight)
"""
import math


def rr(x, y, w, h, r):
    return (f'M{x + r} {y} H{x + w - r} A{r} {r} 0 0 1 {x + w} {y + r} V{y + h - r} '
            f'A{r} {r} 0 0 1 {x + w - r} {y + h} H{x + r} A{r} {r} 0 0 1 {x} {y + h - r} '
            f'V{y + r} A{r} {r} 0 0 1 {x + r} {y} Z')


def circ(cx, cy, r):
    return f'M{cx - r} {cy} a{r} {r} 0 1 0 {2 * r} 0 a{r} {r} 0 1 0 {-2 * r} 0 Z'


def star(cx, cy, ro, ri, n=5, rot=-90):
    pts = []
    for i in range(n * 2):
        r = ro if i % 2 == 0 else ri
        a = math.radians(rot + i * 180 / n)
        pts.append(f'{cx + r * math.cos(a):.2f} {cy + r * math.sin(a):.2f}')
    return 'M' + ' L'.join(pts) + ' Z'


def gear(cx, cy, ro, ri, teeth=8, hole=9):
    pts = []
    step = 360 / teeth
    for i in range(teeth):
        base = i * step
        for ang, r in ((base - step * 0.18, ro), (base + step * 0.18, ro), (base + step * 0.32, ri), (base + step * 0.68, ri)):
            a = math.radians(ang)
            pts.append(f'{cx + r * math.cos(a):.2f} {cy + r * math.sin(a):.2f}')
    return 'M' + ' L'.join(pts) + ' Z ' + circ(cx, cy, hole)


ICONS = {
    'shield': [('f', 'M32 6 L52 13 V30 C52 44 43 53 32 58 C21 53 12 44 12 30 V13 Z'), ('t', 'M23 31 L29.5 37.5 L41 25', 5)],
    'lock': [('t', 'M21 29 V21 A11 11 0 0 1 43 21 V29', 6), ('f', rr(12, 28, 40, 28, 8)), ('t', 'M32 38 V46', 5)],
    'users': [('f', circ(44, 20, 7)), ('f', 'M36 34 C38 31 41 30 44 30 C51 30 56 35 56 46 H42 Z'),
              ('f', circ(24, 21, 9)), ('f', 'M8 52 C8 40 15 34 24 34 C33 34 40 40 40 52 Z')],
    'eye': [('f', 'M5 32 C13 18 23 13 32 13 C41 13 51 18 59 32 C51 46 41 51 32 51 C23 51 13 46 5 32 Z'), ('f', circ(32, 32, 10)), ('t', 'M29 29 L30 30', 3)],
    'database': [('f', 'M12 16 C12 9 52 9 52 16 V48 C52 55 12 55 12 48 Z'),
                 ('t', 'M12 16 C12 23 52 23 52 16', 3), ('t', 'M12 28 C12 35 52 35 52 28', 3), ('t', 'M12 40 C12 47 52 47 52 40', 3)],
    'network': [('t', 'M32 20 V28 M27 37 L18 42 M37 37 L46 42 M20 46 H44', 4),
                ('f', circ(32, 13, 7)), ('f', circ(32, 34, 6)), ('f', circ(13, 47, 7)), ('f', circ(51, 47, 7))],
    'cloud': [('f', 'M18 50 C10 50 5 44 5 37 C5 30 11 25 18 26 C20 17 27 12 35 12 C46 12 53 20 53 30 C58 31 60 36 60 41 C60 46 56 50 51 50 Z')],
    'plug': [('t', 'M25 26 V12 M39 26 V12', 5), ('f', 'M17 26 H47 V34 C47 43 40 49 32 49 C24 49 17 43 17 34 Z'), ('t', 'M32 49 V59', 6)],
    'refresh': [('t', 'M52 30 A20 20 0 1 0 46 46', 7), ('f', 'M58 14 L56 34 L40 26 Z'), ('t', 'M32 22 V32 L39 37', 4)],
    'rocket': [('f', 'M20 32 L9 44 L11 51 L22 45 Z'), ('f', 'M44 32 L55 44 L53 51 L42 45 Z'),
               ('f', 'M26 45 H38 L32 59 Z'), ('f', 'M32 4 C43 12 47 25 44 45 H20 C17 25 21 12 32 4 Z'), ('f', circ(32, 23, 5.5))],
    'trend': [('t', 'M8 56 H56', 4), ('t', 'M9 46 L22 33 L32 41 L48 24', 7), ('f', 'M40 16 H57 V33 Z')],
    'coin': [('f', circ(32, 32, 25)), ('t', circ(32, 32, 17), 3),
             ('t', 'M38.5 25 C36 21.5 27 21.5 27 27 C27 32 37.5 31 37.5 37 C37.5 42.5 28 42.5 25.5 39 M32 18 V46', 3.6)],
    'diamond': [('f', 'M20 9 H44 L57 24 L32 57 L7 24 Z'), ('t', 'M7 24 H57 M20 9 L26 24 L32 57 L38 24 L44 9', 2)],
    'scale': [('t', 'M32 9 V52 M13 17 H51 M20 57 H44', 5),
              ('f', 'M5 34 L13 17 L21 34 C21 40 5 40 5 34 Z'), ('f', 'M43 34 L51 17 L59 34 C59 40 43 40 43 34 Z')],
    'bars': [('f', rr(8, 34, 12, 22, 4)), ('f', rr(26, 22, 12, 34, 4)), ('f', rr(44, 9, 12, 47, 4))],
    'bolt': [('f', 'M37 3 L11 37 H29 L25 61 L53 25 H35 Z')],
    'gear': [('f', gear(32, 32, 27, 20, 8, 9))],
    'robot': [('t', 'M32 18 V11', 4), ('f', circ(32, 8, 4.5)), ('t', 'M9 32 V42 M55 32 V42', 6),
              ('f', rr(14, 18, 36, 34, 10)), ('f', circ(25, 33, 4.5)), ('f', circ(39, 33, 4.5)), ('t', 'M26 44 H38', 3)],
    'star': [('f', star(32, 33, 28, 12))],
    'smile': [('f', circ(32, 32, 26)), ('t', 'M24 24 V29 M40 24 V29', 4.5), ('t', 'M21 38 C26 47 38 47 43 38', 4.5)],
    'chat': [('f', 'M16 9 H48 C53 9 57 13 57 18 V37 C57 42 53 46 48 46 H29 L16 57 V46 C11 46 7 42 7 37 V18 C7 13 11 9 16 9 Z'),
             ('f', circ(21, 28, 3.6)), ('f', circ(32, 28, 3.6)), ('f', circ(43, 28, 3.6))],
    'fetch': [('t', 'M32 6 V31 M21 21 L32 32 L43 21', 6),
              ('f', 'M7 38 H20 L24 45 H40 L44 38 H57 V51 C57 55 54 58 50 58 H14 C10 58 7 55 7 51 Z')],
    'puzzle': [('f', 'M13 13 H27 C27 6 37 6 37 13 H51 V27 C58 27 58 37 51 37 V51 H37 C37 44 27 44 27 51 H13 V37 C20 37 20 27 13 27 Z')],
    'search': [('t', 'M39 39 L54 54', 10), ('f', circ(27, 27, 15)), ('t', circ(27, 27, 15), 5)],
    'heart': [('f', 'M32 57 C14 45 5 35 5 23 C5 15 11 8 20 8 C25 8 29 11 32 15 C35 11 39 8 44 8 C53 8 59 15 59 23 C59 35 50 45 32 57 Z'),
              ('t', 'M13 30 H23 L27 22 L33 38 L37 30 H51', 3)],
    'flask': [('f', 'M23 6 H41 V21 L55 49 C57 54 54 58 49 58 H15 C10 58 7 54 9 49 L23 21 Z'), ('t', 'M14 42 H50', 2.4),
              ('f', circ(27, 50, 3)), ('f', circ(37, 47, 2.2))],
    'factory': [('f', 'M5 57 V30 L19 22 V30 L33 22 V30 L47 22 V10 H57 V57 Z'), ('t', 'M13 45 H20 M27 45 H34 M41 45 H48', 4)],
    'umbrella': [('t', 'M32 30 V50 C32 57 23 57 23 50', 4.5),
                 ('f', 'M5 32 C5 17 17 7 32 7 C47 7 59 17 59 32 C55 28 49 28 45.5 32 C42 28 35.5 28 32 32 C28.5 28 22 28 18.5 32 C15 28 9 28 5 32 Z')],
    'cube': [('f', 'M32 5 L55 18 V45 L32 58 L9 45 V18 Z'), ('t', 'M9 18 L32 31 L55 18 M32 31 V58', 2.4)],
    'bank': [('f', 'M5 23 L32 7 L59 23 Z'), ('t', 'M14 29 V48 M26 29 V48 M38 29 V48 M50 29 V48', 5.5), ('f', rr(5, 51, 54, 7, 2.5))],
    'briefcase': [('t', 'M24 20 V15 C24 12 26 10 29 10 H35 C38 10 40 12 40 15 V20', 4.5), ('f', rr(6, 19, 52, 36, 8)), ('t', 'M6 34 H58', 2.4)],
    'cart': [('t', 'M5 11 H13 L19 39 H49 L56 19 H16', 5), ('f', circ(23, 50, 5.5)), ('f', circ(45, 50, 5.5))],
    'target': [('t', circ(32, 32, 23), 4.5), ('t', circ(32, 32, 13), 4.5), ('f', circ(32, 32, 5.5))],
    'leaf': [('f', 'M52 8 C52 36 39 53 21 53 C12 53 9 47 9 42 C9 23 26 10 52 8 Z'), ('t', 'M12 57 C20 42 31 29 44 18', 3)],
    'globe': [('f', circ(32, 32, 26)), ('t', 'M6 32 H58 M32 6 C21 17 21 47 32 58 M32 6 C43 17 43 47 32 58 M10 19 H54 M10 45 H54', 2)],
    'check': [('f', circ(32, 32, 26)), ('t', 'M21 32 L29 40 L44 24', 5.5)],
    'spark': [('f', 'M32 3 C34 22 42 30 61 32 C42 34 34 42 32 61 C30 42 22 34 3 32 C22 30 30 22 32 3 Z'),
              ('f', 'M52 6 C52.6 10 54 11.4 58 12 C54 12.6 52.6 14 52 18 C51.4 14 50 12.6 46 12 C50 11.4 51.4 10 52 6 Z')],
}

BBOX = {"shield:0":[12,6,40,52],"lock:1":[12,28,40,28],"users:0":[37,13,14,14],"users:1":[36,30,20,16],"users:2":[15,12,18,18],"users:3":[8,34,32,18],"eye:0":[5,13,54,38],"eye:1":[22,22,20,20],"database:0":[12,10.8,40,42.5],"network:1":[25,6,14,14],"network:2":[26,28,12,12],"network:3":[6,40,14,14],"network:4":[44,40,14,14],"cloud:0":[5,12,55,38],"plug:1":[17,26,30,23],"refresh:1":[40,14,18,20],"rocket:0":[9,32,13,19],"rocket:1":[42,32,13,19],"rocket:2":[26,45,12,14],"rocket:3":[19,4,25.9,41],"rocket:4":[26.5,17.5,11,11],"trend:2":[40,16,17,17],"coin:0":[7,7,50,50],"diamond:0":[7,9,50,48],"scale:1":[5,17,16,21.5],"scale:2":[43,17,16,21.5],"bars:0":[8,34,12,22],"bars:1":[26,22,12,34],"bars:2":[44,9,12,47],"bolt:0":[11,3,42,58],"gear:0":[5.3,5.3,53.5,53.5],"robot:1":[27.5,3.5,9,9],"robot:3":[14,18,36,34],"robot:4":[20.5,28.5,9,9],"robot:5":[34.5,28.5,9,9],"star:0":[5.4,5,53.3,50.7],"smile:0":[6,6,52,52],"chat:0":[7,9,50,48],"chat:1":[17.4,24.4,7.2,7.2],"chat:2":[28.4,24.4,7.2,7.2],"chat:3":[39.4,24.4,7.2,7.2],"fetch:1":[7,38,50,20],"puzzle:0":[13,7.8,43.3,43.3],"search:1":[12,12,30,30],"heart:0":[5,8,54,49],"flask:0":[8.4,6,47.3,52],"flask:2":[24,47,6,6],"flask:3":[34.8,44.8,4.4,4.4],"factory:0":[5,10,52,47],"umbrella:1":[5,7,54,25],"cube:0":[9,5,46,53],"bank:0":[5,7,54,16],"bank:2":[5,51,54,7],"briefcase:1":[6,19,52,36],"cart:1":[17.5,44.5,11,11],"cart:2":[39.5,44.5,11,11],"target:2":[26.5,26.5,11,11],"leaf:0":[9,8,43,45],"globe:0":[6,6,52,52],"check:0":[6,6,52,52],"spark:0":[3,3,58,58],"spark:1":[46,6,12,12]}
# Shape bounds (x, y, w, h) measured in the browser; used to place highlights.
# For a new icon, any missing shape falls back to a centred box.

# Colour families: (light, mid, deep, inner-edge, reflected light)
THEMES = {
    'cyan':    ('#67E8F9', '#06B6D4', '#0369A1', '#164E63', '#A5F3FC'),
    'blue':    ('#93C5FD', '#3B82F6', '#1D4ED8', '#1E3A8A', '#BFDBFE'),
    'indigo':  ('#A5B4FC', '#6366F1', '#4338CA', '#312E81', '#C7D2FE'),
    'violet':  ('#D8B4FE', '#A855F7', '#7E22CE', '#4C1D95', '#E9D5FF'),
    'pink':    ('#F9A8D4', '#EC4899', '#BE185D', '#831843', '#FBCFE8'),
    'rose':    ('#FDA4AF', '#F43F5E', '#BE123C', '#881337', '#FECDD3'),
    'orange':  ('#FDBA74', '#F97316', '#C2410C', '#7C2D12', '#FED7AA'),
    'gold':    ('#FDE68A', '#F59E0B', '#B45309', '#78350F', '#FEF3C7'),
    'emerald': ('#6EE7B7', '#10B981', '#047857', '#064E3B', '#A7F3D0'),
    'teal':    ('#5EEAD4', '#14B8A6', '#0F766E', '#134E4A', '#99F6E4'),
}

# Each icon gets the colour that suits its meaning
ICON_THEME = {
    'shield': 'emerald', 'lock': 'gold', 'users': 'violet', 'eye': 'cyan', 'database': 'blue',
    'network': 'teal', 'cloud': 'blue', 'plug': 'emerald', 'refresh': 'cyan', 'rocket': 'orange',
    'trend': 'emerald', 'coin': 'gold', 'diamond': 'cyan', 'scale': 'violet', 'bars': 'blue',
    'bolt': 'gold', 'gear': 'indigo', 'robot': 'cyan', 'star': 'gold', 'smile': 'orange',
    'chat': 'violet', 'fetch': 'blue', 'puzzle': 'violet', 'search': 'gold', 'heart': 'rose',
    'flask': 'emerald', 'factory': 'orange', 'umbrella': 'violet', 'cube': 'indigo', 'bank': 'gold',
    'briefcase': 'teal', 'cart': 'blue', 'target': 'rose', 'leaf': 'emerald', 'globe': 'cyan',
    'check': 'emerald', 'spark': 'pink',
}


def _defs():
    out = ['<defs>']
    for t, (light, mid, deep, inner, refl) in THEMES.items():
        out.append(
            f'<linearGradient id="giClear-{t}" gradientUnits="userSpaceOnUse" x1="8" y1="6" x2="56" y2="58">'
            f'<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.22"/><stop offset="0.5" stop-color="{refl}" stop-opacity="0.08"/>'
            f'<stop offset="1" stop-color="{light}" stop-opacity="0.16"/></linearGradient>'
            f'<linearGradient id="giEdge-{t}" gradientUnits="userSpaceOnUse" x1="6" y1="58" x2="58" y2="6">'
            f'<stop offset="0" stop-color="{light}"/><stop offset="0.45" stop-color="{mid}"/><stop offset="1" stop-color="{deep}"/></linearGradient>'
            f'<linearGradient id="giRim-{t}" gradientUnits="userSpaceOnUse" x1="6" y1="6" x2="58" y2="58">'
            f'<stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="{refl}"/><stop offset="1" stop-color="{light}"/></linearGradient>')
    out.append(
        '<linearGradient id="giSpec" gradientUnits="userSpaceOnUse" x1="6" y1="4" x2="40" y2="40">'
        '<stop offset="0" stop-color="#FFFFFF" stop-opacity="1"/><stop offset="0.6" stop-color="#FFFFFF" stop-opacity="0.5"/>'
        '<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>'
        '<filter id="giGlow" filterUnits="userSpaceOnUse" x="-12" y="-12" width="88" height="88"><feGaussianBlur stdDeviation="2.6"/></filter>'
        '<filter id="giBlur2" filterUnits="userSpaceOnUse" x="-12" y="-12" width="88" height="88"><feGaussianBlur stdDeviation="2.2"/></filter>'
        '<filter id="giBlur1" filterUnits="userSpaceOnUse" x="-12" y="-12" width="88" height="88"><feGaussianBlur stdDeviation="0.8"/></filter>'
        '</defs>')
    return ''.join(out)


DEFS = _defs()

_uid = [0]


def part_svg(p, key, t):
    light, mid, deep, inner, refl = THEMES[t]
    kind, d = p[0], p[1]
    if kind == 'f':
        _uid[0] += 1
        cid = f'giC{_uid[0]}'
        x, y, w, h = BBOX.get(key, (12, 12, 40, 40))
        edge = max(4, min(14, min(w, h) * 0.34))
        ex, ey = x + w * 0.3, y + h * 0.22
        erx, ery = max(w * 0.15, 2), max(h * 0.07, 1.2)
        dot_r = max(min(w, h) * 0.045, 0.8)
        return (f'<clipPath id="{cid}"><path d="{d}" clip-rule="evenodd"/></clipPath>'
                # soft halo of coloured light around the glass
                f'<path d="{d}" fill="{mid}" opacity="0.32" filter="url(#giGlow)" fill-rule="evenodd"/>'
                # clear, almost colourless body
                f'<path d="{d}" fill="url(#giClear-{t})" fill-rule="evenodd"/>'
                f'<g clip-path="url(#{cid})">'
                # colour gathers at the thick edges, centre stays clear
                f'<path d="{d}" fill="none" stroke="url(#giEdge-{t})" stroke-width="{edge:.1f}" opacity="0.95" filter="url(#giBlur2)"/>'
                # thin deep line just inside the edge gives thickness
                f'<path d="{d}" fill="none" stroke="{inner}" stroke-width="2.4" opacity="0.6" filter="url(#giBlur1)"/>'
                # reflected light along the bottom-right inside
                f'<path d="{d}" fill="none" stroke="{refl}" stroke-width="2.6" opacity="0.6" filter="url(#giBlur1)" transform="translate(-1.6 -2.2)"/>'
                # crisp white shine along the top-left inside
                f'<path d="{d}" fill="none" stroke="url(#giSpec)" stroke-width="1.7" transform="translate(1.9 2.5)"/>'
                # bright specular spots
                f'<ellipse cx="{ex:.1f}" cy="{ey:.1f}" rx="{erx:.1f}" ry="{ery:.1f}" fill="#FFFFFF" opacity="0.9" '
                f'transform="rotate(-32 {ex:.1f} {ey:.1f})" filter="url(#giBlur1)"/>'
                f'<circle cx="{x + w * 0.74:.1f}" cy="{y + h * 0.72:.1f}" r="{dot_r:.1f}" fill="#FFFFFF" opacity="0.75"/>'
                f'</g>'
                # light outer rim
                f'<path d="{d}" fill="none" stroke="url(#giRim-{t})" stroke-width="1.1" opacity="0.9" stroke-linejoin="round"/>')
    w = p[2]
    cap = 'stroke-linecap="round" stroke-linejoin="round" fill="none"'
    return (f'<path d="{d}" {cap} stroke="{mid}" stroke-opacity="0.42" stroke-width="{w + 3}" filter="url(#giGlow)"/>'
            f'<path d="{d}" {cap} stroke="url(#giEdge-{t})" stroke-width="{w}"/>'
            f'<path d="{d}" {cap} stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="{w * 0.55:.2f}" filter="url(#giBlur1)"/>'
            f'<path d="{d}" {cap} stroke="{inner}" stroke-opacity="0.5" stroke-width="{max(w * 0.16, 0.6):.2f}" transform="translate(0.7 1)"/>'
            f'<path d="{d}" {cap} stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="{max(w * 0.2, 0.7):.2f}" transform="translate(-0.6 -0.9)"/>')


def sprite():
    _uid[0] = 0
    syms = ''.join(f'<symbol id="gi-{name}" viewBox="0 0 64 64">'
                   + ''.join(part_svg(p, f'{name}:{i}', ICON_THEME.get(name, 'cyan')) for i, p in enumerate(parts))
                   + '</symbol>'
                   for name, parts in ICONS.items())
    return ('<svg class="gi-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" '
            'style="position:absolute;width:0;height:0;overflow:hidden">' + DEFS + syms + '</svg>')


def icon(name, cls='gi'):
    assert name in ICONS, name
    return f'<svg class="{cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href="#gi-{name}"/></svg>'


if __name__ == '__main__':
    import sys
    out = sys.argv[1]
    cells = ''.join(f'<div class="c">{icon(n)}<span>{n}</span></div>' for n in ICONS)
    html = f'''<!doctype html><meta charset="utf-8"><body style="margin:0;background:#0F172A;font:12px sans-serif;color:#94A3B8">
{sprite()}<style>.g{{display:grid;grid-template-columns:repeat(8,1fr);gap:14px;padding:24px}}.c{{display:grid;justify-items:center;gap:6px}}.gi{{width:84px;height:84px;filter:drop-shadow(0 8px 14px rgba(2,6,23,.5))}}</style>
<div class="g">{cells}</div></body>'''
    open(out, 'w', encoding='utf-8').write(html)
