import { useEffect, useRef } from 'react'

// Procedural pixel-art garden, cofounder.co-hero register, drawn on a
// 480x270 canvas upscaled with image-rendering:pixelated. Static layers are
// prerendered; the RAF loop only composites clouds, shimmer, swaying flowers
// and butterflies at ~10fps. Reduced-motion users get a single static frame.

const W = 480
const H = 270
const HORIZON = 118
const LAKE = { cx: 240, cy: HORIZON + 50, rx: 56, ry: 21 }

// stepped-edge ellipse rows for the lake (quantized for pixel-art banks)
function lakeRows() {
  const rows = []
  for (let dy = -LAKE.ry; dy <= LAKE.ry; dy++) {
    const f = 1 - (dy * dy) / (LAKE.ry * LAKE.ry)
    if (f <= 0) continue
    const hw = ((Math.sqrt(f) * LAKE.rx) | 0) & ~1
    rows.push([LAKE.cx - hw, LAKE.cx + hw, LAKE.cy + dy])
  }
  return rows
}

function drawSprite(ctx, map, pal, x, y) {
  for (let j = 0; j < map.length; j++) {
    const row = map[j]
    for (let i = 0; i < row.length; i++) {
      const c = pal[row[i]]
      if (c) {
        ctx.fillStyle = c
        ctx.fillRect(x + i, y + j, 1, 1)
      }
    }
  }
}

// the couple — groom in formal suit, bride in wedding dress with veil
const GROOM_PAL = { h: '#2b2118', f: '#e8b48c', s: '#23262b', w: '#f5f5f0', p: '#1a1d21', b: '#3a2c1e' }
const GROOM_BODY = ['.hhhh.', '.hffh.', '..ff..', '.ssss.', 'sswwss', 's.ww.s', '.swws.', '.ssss.']
const GROOM_LEGS_A = ['.pppp.', '.p..p.', '.p..p.', '.b..b.']
const GROOM_LEGS_B = ['.pppp.', '.p.p..', 'p..p..', 'b..b..']
const BRIDE_PAL = { h: '#4a3220', f: '#e8b48c', v: '#ffffff', d: '#ffffff', q: '#e3e3da', k: '#e88ab0' }
const BRIDE_BODY = ['.hhh.v.', '.fff.v.', '.fff.v.', '..d..v.', '.dddd..', '.ddddq.']
const BRIDE_SKIRT_A = ['.ddddq.', 'ddddddq', 'ddddddq', 'dddddqq', 'ddddddq', 'ddddddq']
const BRIDE_SKIRT_B = ['.ddddq.', 'ddddddq', 'ddddddq', 'dddddqq', '.dddddq', 'dddddd.']
const COUPLE = { groomX0: 192, groomX1: 233, brideX0: 292, brideX1: 240, feetY: 208, meetT: 7 }

// deterministic PRNG so the garden is identical every load
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

// organic clump: noisy filled ellipse
function blob(ctx, rnd, cx, cy, rx, ry, color, density = 0.92) {
  ctx.fillStyle = color
  for (let y = -ry; y <= ry; y++) {
    for (let x = -rx; x <= rx; x++) {
      const d = (x * x) / (rx * rx) + (y * y) / (ry * ry)
      if (d <= 1 && rnd() < density - d * 0.55) ctx.fillRect(cx + x, cy + y, 1, 1)
    }
  }
}

// leafy tuft sprite (foreground plants)
function tuft(ctx, rnd, x, y, s, colors) {
  for (let i = 0; i < 5 + s * 3; i++) {
    const a = rnd() * Math.PI - Math.PI / 2
    const len = s * (2 + rnd() * 3)
    const tx = x + Math.round(Math.cos(a - Math.PI / 2) * len * 0.6)
    const ty = y - Math.round(Math.abs(Math.sin(a)) * len + rnd() * s)
    ctx.fillStyle = colors[(rnd() * colors.length) | 0]
    ctx.fillRect(tx, ty, 1 + (rnd() < 0.4 ? 1 : 0), 1 + (rnd() < 0.5 ? 1 : 0))
  }
}

function buildCloudSprite(rnd, w, h) {
  const c = makeCanvas(w, h)
  const ctx = c.getContext('2d')
  const base = h * 0.8
  // solid stepped cumulus: union of ellipses, quantized to 2px blocks
  const blobs = []
  const n = 6
  for (let i = 0; i < n; i++) {
    const bx = w * 0.12 + (i / (n - 1)) * w * 0.76 + (rnd() - 0.5) * w * 0.06
    const taper = 1 - (Math.abs(i - (n - 1) / 2) / n) * 1.1
    const r = Math.max(h * 0.16, h * (0.3 + rnd() * 0.2) * taper)
    blobs.push([bx, base - r * 0.85, r])
  }
  blobs.push([w * 0.46, base - h * 0.5, h * 0.32]) // tall tower
  ctx.fillStyle = '#ffffff'
  for (let y = 0; y < base; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const xq = x & ~1
      const yq = y & ~1
      for (const [bx, by, r] of blobs) {
        const dx = (xq - bx) / (r * 1.55)
        const dy = (yq - by) / r
        if (dx * dx + dy * dy <= 1) {
          ctx.fillRect(x, y, 1, 1)
          break
        }
      }
    }
  }
  // flat base slab
  ctx.fillRect(blobs[0][0] | 0, (base - 3) | 0, (blobs[n - 1][0] - blobs[0][0]) | 0, 3)
  // underside shading
  const img = ctx.getImageData(0, 0, w, h)
  const d = img.data
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      if (d[i + 3] === 0) continue
      let below = 0
      for (let k = 1; k <= 3; k++) {
        const j = ((y + k) * w + x) * 4
        if (y + k >= h || d[j + 3] === 0) below++
      }
      if (below >= 2) {
        d[i] = 169; d[i + 1] = 198; d[i + 2] = 232 // #A9C6E8
      } else if (below === 1) {
        d[i] = 201; d[i + 1] = 222; d[i + 2] = 242 // #C9DEF2
      }
    }
  }
  ctx.putImageData(img, 0, 0)
  return c
}

function drawTree(ctx, rnd) {
  // trunk
  ctx.fillStyle = '#5e3f2a'
  ctx.fillRect(404, 58, 20, 96)
  ctx.fillStyle = '#7a5538'
  ctx.fillRect(404, 58, 6, 96)
  ctx.fillStyle = '#46301f'
  ctx.fillRect(419, 58, 5, 96)
  // root flare + branches
  ctx.fillStyle = '#5e3f2a'
  ctx.fillRect(396, 146, 36, 8)
  ctx.fillRect(390, 90, 16, 6)
  ctx.fillRect(422, 70, 18, 6)
  // canopy: layered clumps darkest→light
  const layers = [
    ['#1e4d28', 26],
    ['#2a6334', 20],
    ['#3a7f42', 15],
    ['#4f9c52', 9],
    ['#67b566', 4],
  ]
  for (const [color, n] of layers) {
    for (let i = 0; i < n; i++) {
      const cx = 350 + rnd() * 130
      const cy = rnd() * 80 - 4
      if (cx > 470 && cy > 40) continue
      blob(ctx, rnd, cx | 0, cy | 0, 18 + rnd() * 16, 10 + rnd() * 9, color, 0.95)
    }
  }
  // canopy ground shadow
  ctx.fillStyle = 'rgba(30,60,35,0.35)'
  ctx.fillRect(380, 150, 84, 5)
  ctx.fillRect(370, 155, 100, 3)
}

function drawSmallTree(ctx, rnd, x, y, s) {
  ctx.fillStyle = '#5e3f2a'
  ctx.fillRect(x - 2, y - s * 0.5, 4, s * 0.9)
  for (const [color, n] of [['#2a6334', 5], ['#3a7f42', 4], ['#4f9c52', 2]]) {
    for (let i = 0; i < n; i++) {
      blob(ctx, rnd, x + (rnd() - 0.5) * s, y - s * 0.8 - rnd() * s * 0.5, s * 0.7, s * 0.45, color, 0.95)
    }
  }
}

function drawBench(ctx, x, y) {
  ctx.fillStyle = '#8a5a3b'
  ctx.fillRect(x, y, 22, 3)
  ctx.fillRect(x, y + 5, 22, 3)
  ctx.fillStyle = '#6e4730'
  ctx.fillRect(x + 1, y + 8, 2, 6)
  ctx.fillRect(x + 19, y + 8, 2, 6)
}

function drawCity(ctx, rnd) {
  // pale distant skyline
  for (let i = 0; i < 16; i++) {
    const bw = 5 + rnd() * 9
    const bh = 6 + rnd() * (i % 4 === 0 ? 22 : 12)
    const bx = 80 + i * 9 + rnd() * 4
    ctx.fillStyle = i % 2 ? '#9fc3e8' : '#8fb6df'
    ctx.fillRect(bx, HORIZON - bh, bw, bh)
  }
  // landmark spire
  ctx.fillStyle = '#9fc3e8'
  ctx.fillRect(150, HORIZON - 34, 6, 34)
  ctx.fillRect(151, HORIZON - 40, 4, 6)
  ctx.fillRect(152, HORIZON - 45, 2, 5)
}

function buildStatic(seed) {
  const rnd = mulberry32(seed)
  const sky = makeCanvas(W, H)
  const sctx = sky.getContext('2d')
  // sky bands with dithered edges
  const bands = [
    [0, 44, '#3d8fe0'],
    [44, 78, '#4d9fe8'],
    [78, 100, '#5fb1ed'],
    [100, HORIZON, '#79c3f2'],
  ]
  for (const [y0, y1, c] of bands) {
    sctx.fillStyle = c
    sctx.fillRect(0, y0, W, y1 - y0)
  }
  // dither between bands
  for (const [, y1, c] of bands.slice(0, -1)) {
    sctx.fillStyle = c
    for (let x = 0; x < W; x += 2) if (rnd() < 0.5) sctx.fillRect(x + ((y1 % 2) ? 1 : 0), y1, 1, 1)
  }
  // sun glow upper-right
  const glow = sctx.createRadialGradient(430, 10, 5, 430, 10, 150)
  glow.addColorStop(0, 'rgba(255,248,210,0.55)')
  glow.addColorStop(1, 'rgba(255,248,210,0)')
  sctx.fillStyle = glow
  sctx.fillRect(0, 0, W, H)

  const ground = makeCanvas(W, H)
  const g = ground.getContext('2d')
  drawCity(g, rnd)
  // far field
  g.fillStyle = '#7cc159'
  g.fillRect(0, HORIZON, W, 26)
  // mid field
  g.fillStyle = '#5fa84f'
  g.fillRect(0, HORIZON + 26, W, 56)
  // near field
  g.fillStyle = '#4c9444'
  g.fillRect(0, HORIZON + 82, W, H - HORIZON - 82)
  // rolling edge dither between fields
  for (const yy of [HORIZON + 26, HORIZON + 82]) {
    for (let x = 0; x < W; x += 1) {
      if (rnd() < 0.45) {
        g.fillStyle = yy === HORIZON + 26 ? '#7cc159' : '#5fa84f'
        g.fillRect(x, yy + (rnd() < 0.5 ? 0 : 1), 1, 1)
      }
    }
  }
  // field speckle texture
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * W
    const y = HORIZON + rnd() * (H - HORIZON)
    const depth = (y - HORIZON) / (H - HORIZON)
    const palette = depth < 0.3 ? ['#8ed06b', '#6db354'] : depth < 0.65 ? ['#6db354', '#54994a', '#7cc159'] : ['#3f8239', '#54994a', '#2f6b31']
    g.fillStyle = palette[(rnd() * palette.length) | 0]
    g.fillRect(x | 0, y | 0, 1, 1)
  }
  // distant tree line bumps on horizon left of city
  for (let i = 0; i < 12; i++) {
    blob(g, rnd, 8 + i * 7 + rnd() * 4, HORIZON - 1, 5, 3, i % 2 ? '#4c8c40' : '#3e7e46', 0.9)
  }
  for (let i = 0; i < 10; i++) {
    blob(g, rnd, 230 + i * 25 + rnd() * 8, HORIZON - 2, 7, 3, '#4c8c40', 0.9)
  }
  // winding path: interpolate control points so the ribbon is continuous
  const pathPts = [
    [236, HORIZON + 2, 10], [228, HORIZON + 10, 13], [214, HORIZON + 20, 16],
    [192, HORIZON + 32, 20], [162, HORIZON + 46, 26], [120, HORIZON + 64, 34],
    [66, HORIZON + 88, 46], [10, HORIZON + 118, 60],
  ]
  const pathRows = []
  for (let i = 0; i < pathPts.length - 1; i++) {
    const [x0, y0, w0] = pathPts[i]
    const [x1, y1, w1] = pathPts[i + 1]
    for (let y = y0; y < y1; y++) {
      const f = (y - y0) / (y1 - y0)
      pathRows.push([x0 + (x1 - x0) * f, y, w0 + (w1 - w0) * f])
    }
  }
  g.fillStyle = '#d9b26f'
  for (const [px, py, pw] of pathRows) {
    g.fillRect((px - pw / 2) | 0, py | 0, pw | 0, 1)
  }
  // path texture
  for (let i = 0; i < 420; i++) {
    const [px, py, pw] = pathRows[(rnd() * pathRows.length) | 0]
    g.fillStyle = rnd() < 0.5 ? '#c49c5c' : '#e3c187'
    g.fillRect((px - pw / 2 + rnd() * pw) | 0, py | 0, 1, 1)
  }
  drawSmallTree(g, rnd, 44, HORIZON + 18, 22)
  drawSmallTree(g, rnd, 318, HORIZON + 6, 12)
  drawBench(g, 78, HORIZON + 16)
  drawTree(g, rnd)
  // mid-field bushes
  for (let i = 0; i < 7; i++) {
    const bx = 20 + rnd() * 300
    const by = HORIZON + 30 + rnd() * 40
    const ddx = (bx - LAKE.cx) / (LAKE.rx + 10)
    const ddy = (by - LAKE.cy) / (LAKE.ry + 8)
    if (ddx * ddx + ddy * ddy < 1) continue
    blob(g, rnd, bx, by, 8 + rnd() * 6, 4 + rnd() * 3, '#3f8239', 0.9)
    blob(g, rnd, bx - 2, by - 2, 5, 2.5, '#54994a', 0.85)
  }
  // ---- the lake (Casa de Lago) ----
  const rows = lakeRows()
  // bank: dark grass rim on the far side, sand only on the near shore
  for (const [x0, x1, y] of rows) {
    const isNear = y > LAKE.cy + LAKE.ry * 0.2
    g.fillStyle = isNear ? '#cfae6e' : '#3f8239'
    g.fillRect(x0 - 1, y, x1 - x0 + 2, 1)
  }
  g.fillStyle = '#3f8239'
  g.fillRect(rows[0][0], rows[0][2] - 1, rows[0][1] - rows[0][0], 1)
  g.fillStyle = '#cfae6e'
  g.fillRect(rows[rows.length - 1][0], rows[rows.length - 1][2] + 1, rows[rows.length - 1][1] - rows[rows.length - 1][0], 1)
  // water: sky-lit far band -> deep near band, dithered
  for (const [x0, x1, y] of rows) {
    const t = (y - (LAKE.cy - LAKE.ry)) / (2 * LAKE.ry)
    const base = t < 0.35 ? '#7cc3ec' : t < 0.7 ? '#549fd9' : '#3d7fbf'
    g.fillStyle = base
    g.fillRect(x0, y, x1 - x0, 1)
    const dither = t < 0.35 ? '#549fd9' : t < 0.7 ? '#3d7fbf' : '#326a9f'
    g.fillStyle = dither
    for (let x = x0; x < x1; x++) if (rnd() < 0.12) g.fillRect(x, y, 1, 1)
  }
  // big-tree reflection, lower-right of the water
  g.fillStyle = 'rgba(46,92,62,0.55)'
  for (const [x0, x1, y] of rows) {
    if (y < LAKE.cy) continue
    for (let x = Math.max(x0, LAKE.cx + 14); x < x1 - 2; x++) {
      if (rnd() < 0.3) g.fillRect(x, y, 2, 1)
    }
  }
  // pale sky-reflection streaks
  g.fillStyle = '#a8d8f2'
  for (let i = 0; i < 14; i++) {
    const [x0, x1, y] = rows[(rnd() * rows.length * 0.5) | 0]
    const sx = x0 + rnd() * (x1 - x0 - 8)
    g.fillRect(sx | 0, y, 4 + ((rnd() * 6) | 0), 1)
  }
  // lily pads + blossom
  for (const [lx, ly] of [[LAKE.cx - 32, LAKE.cy + 8], [LAKE.cx + 20, LAKE.cy + 13], [LAKE.cx + 36, LAKE.cy + 2]]) {
    g.fillStyle = '#3f8239'
    g.fillRect(lx, ly, 4, 2)
    g.fillStyle = '#54994a'
    g.fillRect(lx, ly, 2, 1)
  }
  g.fillStyle = '#e88ab0'
  g.fillRect(LAKE.cx + 21, LAKE.cy + 12, 1, 1)
  // reeds on both banks
  for (const [bx, by, n] of [[LAKE.cx - LAKE.rx - 4, LAKE.cy + 6, 4], [LAKE.cx + LAKE.rx - 2, LAKE.cy + 10, 5], [LAKE.cx - LAKE.rx + 6, LAKE.cy + 16, 3]]) {
    for (let i = 0; i < n; i++) {
      const rx2 = bx + i * 2 + ((rnd() * 2) | 0)
      const rh = 4 + ((rnd() * 4) | 0)
      g.fillStyle = '#2a6334'
      g.fillRect(rx2, by - rh, 1, rh)
      if (rnd() < 0.6) {
        g.fillStyle = '#6e4730'
        g.fillRect(rx2, by - rh - 2, 1, 2)
      }
    }
  }

  // floral wedding arch where the couple meets
  const archX = 239
  const archBase = 205
  g.fillStyle = '#f4f4ee'
  g.fillRect(archX - 8, archBase - 14, 2, 14)
  g.fillRect(archX + 8, archBase - 14, 2, 14)
  g.fillRect(archX - 7, archBase - 16, 16, 2)
  g.fillRect(archX - 5, archBase - 17, 12, 1)
  const archFlowers = ['#e86a6a', '#e88ab0', '#f2c94c', '#f3f3ef']
  for (let i = 0; i < 14; i++) {
    const along = rnd()
    let fx
    let fy
    if (along < 0.35) {
      fx = archX - 9 + ((rnd() * 3) | 0)
      fy = archBase - 14 + rnd() * 12
    } else if (along < 0.7) {
      fx = archX + 7 + ((rnd() * 3) | 0)
      fy = archBase - 14 + rnd() * 12
    } else {
      fx = archX - 7 + rnd() * 15
      fy = archBase - 17 + ((rnd() * 3) | 0)
    }
    g.fillStyle = rnd() < 0.3 ? '#3f8239' : archFlowers[(rnd() * archFlowers.length) | 0]
    g.fillRect(fx | 0, fy | 0, 1, 1)
  }

  // foreground dark foliage band
  const fgPalette = ['#16381f', '#1f4a2a', '#2a5c33', '#356b3c']
  for (let y = 210; y < H; y++) {
    g.fillStyle = fgPalette[0]
    g.fillRect(0, y, W, 1)
  }
  for (let i = 0; i < 90; i++) {
    const x = rnd() * W
    const y = 208 + rnd() * (H - 208)
    blob(g, rnd, x, y, 10 + rnd() * 12, 5 + rnd() * 6, fgPalette[1 + ((rnd() * 3) | 0)], 0.9)
  }
  for (let i = 0; i < 160; i++) {
    tuft(g, rnd, rnd() * W, 214 + rnd() * 54, 1 + rnd() * 2, fgPalette.slice(1).concat('#4c8c40'))
  }
  // bumpy top edge of foreground band
  for (let x = 0; x < W; x += 3) {
    const hgt = 2 + ((rnd() * 7) | 0)
    g.fillStyle = fgPalette[1 + ((rnd() * 3) | 0)]
    g.fillRect(x, 210 - hgt, 3, hgt)
  }
  // scattered accent flowers in foreground
  const accents = ['#d94f4f', '#e8c84c', '#e88ab0', '#f3f3ef', '#b187d8']
  for (let i = 0; i < 26; i++) {
    const x = (rnd() * W) | 0
    const y = (216 + rnd() * 48) | 0
    g.fillStyle = accents[(rnd() * accents.length) | 0]
    g.fillRect(x, y, 2, 2)
    g.fillStyle = '#f6d44c'
    if (rnd() < 0.4) g.fillRect(x, y, 1, 1)
  }
  // mid-field flower patches
  for (let i = 0; i < 18; i++) {
    const x = (rnd() * 360) | 0
    const y = (HORIZON + 30 + rnd() * 45) | 0
    g.fillStyle = accents[(rnd() * accents.length) | 0]
    g.fillRect(x, y, 1, 1)
  }

  // god-rays overlay from upper-right
  const rays = makeCanvas(W, H)
  const rctx = rays.getContext('2d')
  rctx.fillStyle = 'rgba(255,248,200,0.07)'
  for (const [x0, w0] of [[300, 26], [352, 18], [398, 30], [448, 14]]) {
    rctx.save()
    rctx.translate(x0, 0)
    rctx.rotate(0.5)
    rctx.fillRect(0, -40, w0, 360)
    rctx.restore()
  }
  return { sky, ground, rays, rnd }
}

export default function PixelGarden() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    const { sky, ground, rays } = buildStatic(20261010)
    const cloudRnd = mulberry32(7)
    // keep cloud bottoms above ~y90 so they never sit behind the headline
    const clouds = [
      { sprite: buildCloudSprite(cloudRnd, 150, 56), x: 40, y: 6, v: 2.0 },
      { sprite: buildCloudSprite(cloudRnd, 210, 68), x: 210, y: 16, v: 1.3 },
      { sprite: buildCloudSprite(cloudRnd, 110, 42), x: 360, y: 2, v: 2.8 },
      { sprite: buildCloudSprite(cloudRnd, 76, 28), x: 120, y: 48, v: 3.6 },
    ]
    // swaying sunflower (tall, like the reference) + flowers, drawn per frame
    const sunflower = { x: 296, y: 210 }
    const butterflies = [
      { cx: 232, cy: 146, rx: 36, ry: 12, sp: 0.45, ph: 0, c: '#fef3c0' },
      { cx: 358, cy: 178, rx: 40, ry: 14, sp: 0.3, ph: 2.1, c: '#f3f3ef' },
    ]
    const waterRnd = mulberry32(31)
    const sparkles = Array.from({ length: 46 }, () => {
      const a = waterRnd() * Math.PI * 2
      const r = Math.sqrt(waterRnd()) * 0.88
      return {
        x: (LAKE.cx + Math.cos(a) * LAKE.rx * r) | 0,
        y: (LAKE.cy + Math.sin(a) * LAKE.ry * r) | 0,
        ph: waterRnd() * Math.PI * 2,
      }
    })
    const swans = [
      { x0: LAKE.cx - 18, y: LAKE.cy - 2, amp: 16, sp: 0.10, ph: 0 },
      { x0: LAKE.cx + 16, y: LAKE.cy + 7, amp: 12, sp: 0.07, ph: 2.4 },
    ]
    function drawSwan(x, y, dir) {
      ctx.fillStyle = '#f6f8f7'
      ctx.fillRect(x, y, 4, 2)
      ctx.fillRect(dir > 0 ? x + 3 : x, y - 3, 1, 3)
      ctx.fillRect(dir > 0 ? x + 3 : x - 1, y - 3, 2, 1)
      ctx.fillStyle = '#e8a33c'
      ctx.fillRect(dir > 0 ? x + 5 : x - 2, y - 3, 1, 1)
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.fillRect(dir > 0 ? x - 3 : x + 4, y + 2, 3, 1)
    }
    const hearts = []
    const petalRnd = mulberry32(55)
    const petals = Array.from({ length: 11 }, () => ({
      x: petalRnd() * W,
      y: petalRnd() * 150,
      vx: 5 + petalRnd() * 7,
      vy: 2.5 + petalRnd() * 3,
      ph: petalRnd() * Math.PI * 2,
      c: petalRnd() < 0.5 ? '#f7c8d4' : '#e88ab0',
    }))
    let lastHeart = 0

    function drawCouple(t) {
      const k = Math.min(t / COUPLE.meetT, 1)
      const ease = k * k * (3 - 2 * k) // smoothstep stroll
      const gx = (COUPLE.groomX0 + (COUPLE.groomX1 - COUPLE.groomX0) * ease) | 0
      const bx = (COUPLE.brideX0 + (COUPLE.brideX1 - COUPLE.brideX0) * ease) | 0
      const walking = k < 1
      const step = ((t * 4) | 0) % 2 === 0
      const gBob = walking && step ? -1 : 0
      const bBob = walking && !step ? -1 : 0
      const groomTop = COUPLE.feetY - 12 + gBob
      drawSprite(ctx, GROOM_BODY, GROOM_PAL, gx, groomTop)
      drawSprite(ctx, walking && step ? GROOM_LEGS_B : GROOM_LEGS_A, GROOM_PAL, gx, groomTop + 8)
      const brideTop = COUPLE.feetY - 12 + bBob
      drawSprite(ctx, BRIDE_BODY, BRIDE_PAL, bx, brideTop)
      drawSprite(ctx, walking && !step ? BRIDE_SKIRT_B : BRIDE_SKIRT_A, BRIDE_PAL, bx, brideTop + 6)
      // bouquet in the bride's outer hand
      ctx.fillStyle = '#e88ab0'
      ctx.fillRect(bx + 5, brideTop + 5, 2, 1)
      ctx.fillStyle = '#f2c94c'
      ctx.fillRect(bx + 5, brideTop + 4, 1, 1)
      if (!walking) {
        // holding hands
        ctx.fillStyle = '#e8b48c'
        ctx.fillRect(COUPLE.groomX1 + 6, COUPLE.feetY - 7, COUPLE.brideX1 - COUPLE.groomX1 - 6, 1)
        // hearts rise above the couple
        if (t - lastHeart > 2.6) {
          lastHeart = t
          hearts.push({ x: COUPLE.groomX1 + 5 + ((t * 13) % 7 | 0), y: COUPLE.feetY - 16, born: t })
        }
      }
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h2 = hearts[i]
        const age = t - h2.born
        if (age > 2.2) {
          hearts.splice(i, 1)
          continue
        }
        const hy = (h2.y - age * 5) | 0
        ctx.globalAlpha = Math.max(0, 1 - age / 2.2)
        ctx.fillStyle = '#e86a6a'
        ctx.fillRect(h2.x, hy, 1, 1)
        ctx.fillRect(h2.x + 2, hy, 1, 1)
        ctx.fillRect(h2.x, hy + 1, 3, 1)
        ctx.fillRect(h2.x + 1, hy + 2, 1, 1)
        ctx.globalAlpha = 1
      }
    }

    function drawPetals(t) {
      for (const pt of petals) {
        const px2 = (pt.x + t * pt.vx) % (W + 10) - 5
        const py2 = (pt.y + t * pt.vy + Math.sin(t * 1.5 + pt.ph) * 4) % (200)
        ctx.fillStyle = pt.c
        ctx.fillRect(px2 | 0, py2 | 0, pt.ph > 3 ? 2 : 1, 1)
      }
    }

    const shimmerRnd = mulberry32(99)
    const shimmers = Array.from({ length: 70 }, () => ({
      x: (shimmerRnd() * W) | 0,
      y: (212 + shimmerRnd() * 54) | 0,
      ph: shimmerRnd() * Math.PI * 2,
    }))

    function drawSunflower(t) {
      const lean = Math.sin(t * 0.8) * 2.2
      ctx.strokeStyle = '#2a6334'
      ctx.fillStyle = '#2a6334'
      // stem (stepped)
      for (let i = 0; i < 26; i++) {
        const yy = sunflower.y - i
        const xx = sunflower.x + (lean * i) / 26
        ctx.fillRect(xx | 0, yy, 2, 1)
      }
      const hx = (sunflower.x + lean) | 0
      const hy = sunflower.y - 28
      ctx.fillStyle = '#e8c84c'
      ctx.fillRect(hx - 4, hy - 3, 10, 8)
      ctx.fillRect(hx - 2, hy - 5, 6, 12)
      ctx.fillStyle = '#f6d44c'
      ctx.fillRect(hx - 4, hy - 3, 4, 3)
      ctx.fillStyle = '#6e4730'
      ctx.fillRect(hx - 1, hy, 4, 4)
      // leaf
      ctx.fillStyle = '#3a7f42'
      ctx.fillRect(hx + 1, sunflower.y - 14, 6, 2)
    }

    let raf = 0
    let last = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function frame(ts) {
      if (ts - last >= 100) { // ~10fps pixel cadence
        last = ts
        const t = ts / 1000
        ctx.drawImage(sky, 0, 0)
        for (const cl of clouds) {
          const cx = ((cl.x + t * cl.v) % (W + cl.sprite.width)) - cl.sprite.width
          ctx.drawImage(cl.sprite, cx | 0, cl.y)
        }
        ctx.drawImage(ground, 0, 0)
        drawSunflower(t)
        drawCouple(t)
        drawPetals(t)
        // grass shimmer
        for (const s of shimmers) {
          if (Math.sin(t * 1.8 + s.ph) > 0.86) {
            ctx.fillStyle = 'rgba(140,210,120,0.8)'
            ctx.fillRect(s.x, s.y, 1, 1)
          }
        }
        // water sparkle
        for (const sp2 of sparkles) {
          if (Math.sin(t * 2.2 + sp2.ph) > 0.78) {
            ctx.fillStyle = 'rgba(225,246,255,0.9)'
            ctx.fillRect(sp2.x, sp2.y, 1, 1)
          }
        }
        // gliding swans
        for (const sw of swans) {
          const xx = sw.x0 + Math.sin(t * sw.sp + sw.ph) * sw.amp
          const dir = Math.cos(t * sw.sp + sw.ph) >= 0 ? 1 : -1
          const bob = Math.sin(t * 1.3 + sw.ph) > 0.6 ? 1 : 0
          drawSwan(xx | 0, (sw.y + bob) | 0, dir)
        }
        // butterflies
        for (const b of butterflies) {
          const bx = b.cx + Math.cos(t * b.sp + b.ph) * b.rx
          const by = b.cy + Math.sin(t * b.sp * 2 + b.ph) * b.ry
          const flap = ((t * 8) | 0) % 2
          ctx.fillStyle = b.c
          ctx.fillRect(bx | 0, by | 0, 2, 1)
          if (flap) ctx.fillRect((bx | 0) - 1, (by | 0) - 1, 4, 1)
        }
        ctx.drawImage(rays, 0, 0)
      }
      raf = requestAnimationFrame(frame)
    }

    if (reduced) {
      ctx.drawImage(sky, 0, 0)
      for (const cl of clouds) ctx.drawImage(cl.sprite, cl.x, cl.y)
      ctx.drawImage(ground, 0, 0)
      drawSunflower(0)
      drawCouple(COUPLE.meetT + 1)
      drawSwan(LAKE.cx - 12, LAKE.cy - 2, 1)
      drawSwan(LAKE.cx + 20, LAKE.cy + 7, -1)
      ctx.drawImage(rays, 0, 0)
    } else {
      raf = requestAnimationFrame(frame)
    }
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
    />
  )
}
