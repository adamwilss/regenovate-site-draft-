"use client"

import { useEffect, useRef } from "react"

// ─── Particle ──────────────────────────────────────────────────────
class P {
  x = 0; y = 0; vx = 0; vy = 0
  tx = 0; ty = 0
  r = 255; g = 255; b = 255
  tr = 255; tg = 255; tb = 255
  sr = 255; sg = 255; sb = 255
  // Source word color — preserved through reform so REGENOVATE inherits mixed hues
  srcR = 255; srcG = 255; srcB = 255
  blend = 1; rate = 0.025
  spd = 8; frc = 0.4
  dead = false
  sz = 2  // draw size — shrinks to 1 during settle

  update() {
    const dx = this.tx - this.x
    const dy = this.ty - this.y
    const d  = Math.sqrt(dx * dx + dy * dy) || 0.001
    const prox = d < 60 ? d / 60 : 1

    let sfx = (dx / d) * this.spd * prox - this.vx
    let sfy = (dy / d) * this.spd * prox - this.vy
    const sm = Math.sqrt(sfx * sfx + sfy * sfy) || 0.001
    if (sm > this.frc) { sfx = (sfx / sm) * this.frc; sfy = (sfy / sm) * this.frc }

    this.vx += sfx; this.vy += sfy
    this.x  += this.vx; this.y  += this.vy

    if (this.blend < 1) this.blend = Math.min(1, this.blend + this.rate)
    this.r = this.sr + (this.tr - this.sr) * this.blend
    this.g = this.sg + (this.tg - this.sg) * this.blend
    this.b = this.sb + (this.tb - this.sb) * this.blend
  }

  setTarget(tx: number, ty: number, tr: number, tg: number, tb: number) {
    this.tx = tx; this.ty = ty
    this.sr = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr = tr; this.tg = tg; this.tb = tb
    this.blend = 0; this.dead = false
  }

  burst() {
    if (this.dead) return
    this.dead = true
    const a    = Math.random() * Math.PI * 2
    const spd  = 8 + Math.random() * 7
    this.vx    = Math.cos(a) * spd
    this.vy    = Math.sin(a) * spd
    this.tx    = this.x + Math.cos(a) * 3000
    this.ty    = this.y + Math.sin(a) * 3000
    this.sr    = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr    = 13; this.tg = 27; this.tb = 62
    this.blend = 0
  }

  // Collapse toward centre before explosion
  implosion(cx: number, cy: number) {
    this.tx   = cx + (Math.random() - 0.5) * 20
    this.ty   = cy + (Math.random() - 0.5) * 20
    this.spd  = 20 + Math.random() * 14
    this.frc  = this.spd * 0.12
    this.rate = 0.07
    this.sr = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr = 200; this.tg = 215; this.tb = 255   // flash bright blue-white
    this.blend = 0
    this.dead  = false
  }

  // Radial explosion from centre — dramatic, long-trail
  explodeFrom(cx: number, cy: number) {
    const dx = this.x - cx
    const dy = this.y - cy
    const a  = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5  // ±~15° organic spread
    const spd = 40 + Math.random() * 45
    this.vx  = Math.cos(a) * spd
    this.vy  = Math.sin(a) * spd
    this.frc = 0.012   // low friction → long elegant trails
    this.spd = 0.4
    this.tx  = cx + Math.cos(a) * 6000
    this.ty  = cy + Math.sin(a) * 6000
    this.sr  = 220; this.sg = 230; this.sb = 255   // streak from bright white
    this.tr  = 13;  this.tg = 27;  this.tb = 62    // fade to background
    this.rate = 0.018
    this.blend = 0
    this.dead  = true
  }

  // Decelerate mid-flight to a scatter position — illusion of becoming background dots
  settleToAmbient(tx: number, ty: number) {
    this.tx   = tx
    this.ty   = ty
    this.frc  = 0.06    // friction decelerates into place
    this.spd  = 0.4     // very low attraction — drifts, doesn't snap
    this.rate = 0.008   // slow colour blend
    this.sz   = 1       // shrink to 1px — matches real ParticleField dots
    // Target: ParticleField blue (hsl ~225, 70%, 65% → approx rgb)
    this.sr = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr = 70  + Math.random() * 40
    this.tg = 155 + Math.random() * 20
    this.tb = 245 + Math.random() * 10
    this.blend = 0
    this.dead  = false   // re-activate so update() keeps running
  }
}

// ─── Helpers ───────────────────────────────────────────────────────
function textPositions(
  text: string, cx: number, cy: number,
  fs: number, cw: number, ch: number, step: number,
  align: CanvasTextAlign = "center"
): Array<{ x: number; y: number }> {
  const oc  = document.createElement("canvas")
  oc.width  = cw; oc.height = ch
  const ctx = oc.getContext("2d", { willReadFrequently: true })!
  ctx.fillStyle = "white"
  ctx.font = `bold ${fs}px Arial`
  ctx.textAlign = align; ctx.textBaseline = "middle"
  ctx.fillText(text, cx, cy)
  const d   = ctx.getImageData(0, 0, cw, ch).data
  const pts: Array<{ x: number; y: number }> = []
  for (let i = 0; i < d.length; i += step * 4)
    if (d[i + 3] > 128) pts.push({ x: (i / 4) % cw, y: Math.floor(i / 4 / cw) })
  return pts
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Component ─────────────────────────────────────────────────────
interface Props {
  onWordFormed:    () => void
  onComplete:      () => void
  onSettleBegin?:  () => void
}

export function HeroParticleIntro({ onWordFormed, onComplete, onSettleBegin }: Props) {
  const canvasRef        = useRef<HTMLCanvasElement>(null)
  const onFormedRef      = useRef(onWordFormed)
  const onCompleteRef    = useRef(onComplete)
  const onSettleBeginRef = useRef(onSettleBegin)
  onFormedRef.current      = onWordFormed
  onCompleteRef.current    = onComplete
  onSettleBeginRef.current = onSettleBegin

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.offsetWidth  || 1200
    const H = canvas.offsetHeight || 600
    canvas.width  = W
    canvas.height = H

    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "rgb(13,27,62)"
    ctx.fillRect(0, 0, W, H)

    const particles: P[] = []
    const mob  = W < 700
    const STEP = mob ? 7 : 9

    const fSrc = Math.min(Math.max((W / (mob ? 10 : 20)) | 0, 30), 90)
    const fFin = Math.min(Math.max((W / (mob ? 8  : 15)) | 0, 36), 100)

    const WHITE: [number, number, number] = [255, 255, 255]
    const BLUE:  [number, number, number] = [96,  165, 250]

    // ── Phase thresholds ─────────────────────────────────────────
    // 0 forming → 1 hold → 2 burst → 3 reform → 4 hold2 → 5 reformR → 6 holdR → 7 implode → 8 explode → 9 settle → done
    const T = { hold: 155, burst: 205, reform: 240, hold2: 400, reformR: 440, holdR: 560, implode: 600, explode: 645, settle: 675, done: 800 }

    // ── Build source words ────────────────────────────────────────
    const formWords = () => {
      const cx1 = mob ? W * 0.5 : W * 0.28
      const cy1 = mob ? H * 0.37 : H * 0.5
      const cx2 = mob ? W * 0.5 : W * 0.72
      const cy2 = mob ? H * 0.63 : H * 0.5

      type Tagged = { x: number; y: number; c: [number,number,number]; left: boolean }
      const rPts: Tagged[] = shuffle(textPositions("Regenerate", cx1, cy1, fSrc, W, H, STEP))
        .map(p => ({ ...p, c: WHITE, left: true  }))
      const iPts: Tagged[] = shuffle(textPositions("Innovate",   cx2, cy2, fSrc, W, H, STEP))
        .map(p => ({ ...p, c: BLUE,  left: false }))

      for (const pos of [...rPts, ...iPts]) {
        const p   = new P()
        p.x       = pos.left ? -80 - Math.random() * 80 : W + Math.random() * 80
        p.y       = H * 0.3 + Math.random() * H * 0.4
        p.vx      = pos.left ? Math.random() * 3 : -Math.random() * 3
        p.spd     = Math.random() * 4 + 7
        p.frc     = p.spd * 0.07
        p.rate    = Math.random() * 0.025 + 0.012
        p.r = p.sr = p.tr = pos.c[0]
        p.g = p.sg = p.tg = pos.c[1]
        p.b = p.sb = p.tb = pos.c[2]
        p.srcR = pos.c[0]; p.srcG = pos.c[1]; p.srcB = pos.c[2]
        p.blend   = 1
        p.setTarget(pos.x, pos.y, pos.c[0], pos.c[1], pos.c[2])
        particles.push(p)
      }
    }

    // ── Reform: redirect the SAME particles to Regenovate ─────────
    const reformWord = () => {
      const pts = shuffle(textPositions("Regenovate", W * 0.5, H * 0.5, fFin, W, H, STEP))

      for (let i = 0; i < Math.min(pts.length, particles.length); i++) {
        const p  = particles[i]
        const pos = pts[i]
        p.spd    = Math.random() * 5 + 12
        p.frc    = p.spd * 0.08
        p.rate   = Math.random() * 0.02 + 0.015
        p.setTarget(pos.x, pos.y, p.srcR, p.srcG, p.srcB)
      }

      for (let i = pts.length; i < particles.length; i++) {
        const p = particles[i]
        if (!p.dead) p.burst()
        const a = Math.random() * Math.PI * 2
        p.tx = W / 2 + Math.cos(a) * (W + 200)
        p.ty = H / 2 + Math.sin(a) * (H + 200)
      }
    }

    // ── Reform to R. icon — R in brand blue, dot in near-black ──
    const reformToR = () => {
      const rFs = Math.min(Math.max((W * 0.30) | 0, 150), 400)

      // Measure natural glyph widths so we can position R and . independently
      const mc = document.createElement("canvas")
      const mctx = mc.getContext("2d")!
      mctx.font = `bold ${rFs}px Arial`
      const fullW  = mctx.measureText("R.").width
      const rCharW = mctx.measureText("R").width
      const startX = (W - fullW) / 2   // left edge of the combined "R."

      const IR: [number,number,number] = [58, 123, 255]   // brand blue
      const ID: [number,number,number] = [18, 22, 42]     // near-black dot

      type Colored = { x: number; y: number; c: [number,number,number] }
      const allPts: Colored[] = [
        ...textPositions("R", startX,          H * 0.5, rFs, W, H, STEP, "left").map(p => ({ ...p, c: IR })),
        ...textPositions(".", startX + rCharW, H * 0.5, rFs, W, H, STEP, "left").map(p => ({ ...p, c: ID })),
      ]
      shuffle(allPts)

      for (let i = 0; i < Math.min(allPts.length, particles.length); i++) {
        const p   = particles[i]
        const pos = allPts[i]
        p.spd  = Math.random() * 5 + 12
        p.frc  = p.spd * 0.08
        p.rate = Math.random() * 0.02 + 0.015
        p.setTarget(pos.x, pos.y, pos.c[0], pos.c[1], pos.c[2])
      }

      for (let i = allPts.length; i < particles.length; i++) {
        const p = particles[i]
        if (!p.dead) p.burst()
        const a = Math.random() * Math.PI * 2
        p.tx = W / 2 + Math.cos(a) * (W + 200)
        p.ty = H / 2 + Math.sin(a) * (H + 200)
      }
    }

    // Pre-compute scatter targets for settle phase
    const settleTargets = Array.from({ length: 2000 },
      () => ({ x: Math.random() * W, y: Math.random() * H }))

    formWords()

    let phase = 0
    let frame = 0
    let done  = false
    let rafId = 0
    const cx = W * 0.5
    const cy = H * 0.5

    const tick = () => {
      // Trail alpha varies by phase
      if (phase >= 9) {
        ctx.fillStyle = "rgba(13,27,62,0.12)"   // dust fade during settle
      } else if (phase === 8) {
        ctx.fillStyle = "rgba(13,27,62,0.04)"   // near-transparent streaks during explosion
      } else if (phase === 7) {
        ctx.fillStyle = "rgba(13,27,62,0.16)"   // motion blur during implode rush
      } else {
        ctx.fillStyle = "rgba(13,27,62,0.22)"   // normal
      }
      ctx.fillRect(0, 0, W, H)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()
        ctx.fillStyle = `rgb(${p.r | 0},${p.g | 0},${p.b | 0})`
        ctx.fillRect(p.x | 0, p.y | 0, p.sz, p.sz)

        // Only prune during/after hold2
        if (phase >= 4 && p.dead &&
            (p.x < -200 || p.x > W + 200 || p.y < -200 || p.y > H + 200))
          particles.splice(i, 1)
      }

      frame++
      if (phase === 0 && frame >= T.hold)     phase = 1
      if (phase === 1 && frame >= T.burst)    { phase = 2; particles.forEach(p => p.burst()) }
      if (phase === 2 && frame >= T.reform)   { phase = 3; reformWord() }
      if (phase === 3 && frame >= T.hold2)    { phase = 4; onFormedRef.current() }
      if (phase === 4 && frame >= T.reformR)  { phase = 5; reformToR() }
      if (phase === 5 && frame >= T.holdR)    phase = 6
      if (phase === 6 && frame >= T.implode)  { phase = 7; particles.forEach(p => p.implosion(cx, cy)) }
      if (phase === 7 && frame >= T.explode)  { phase = 8; particles.forEach(p => p.explodeFrom(cx, cy)) }
      if (phase === 8 && frame >= T.settle) {
        phase = 9
        shuffle(settleTargets)
        particles.forEach((p, i) => {
          const t = settleTargets[i % settleTargets.length]
          p.settleToAmbient(t.x, t.y)
        })
        onSettleBeginRef.current?.()
      }
      if (phase === 9 && frame >= T.done && !done) {
        done = true
        onCompleteRef.current()
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />
}
