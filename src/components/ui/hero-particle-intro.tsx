"use client"

import { useEffect, useRef } from "react"

// ─── Particle ──────────────────────────────────────────────────────
class P {
  x = 0; y = 0; vx = 0; vy = 0
  tx = 0; ty = 0
  r = 255; g = 255; b = 255
  tr = 255; tg = 255; tb = 255
  sr = 255; sg = 255; sb = 255
  blend = 1; rate = 0.025
  spd = 8; frc = 0.4
  dead = false

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
    this.x  += this.vx; this.y += this.vy

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

  kill(cw: number, ch: number) {
    if (this.dead) return
    this.dead = true
    const a = Math.random() * Math.PI * 2
    const d = Math.max(cw, ch) * (0.6 + Math.random() * 0.5)
    this.tx = cw / 2 + Math.cos(a) * d
    this.ty = ch / 2 + Math.sin(a) * d
    this.sr = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr = 2; this.tg = 6; this.tb = 23
    this.blend = 0
    this.spd = Math.min(this.spd * 2.2, 22)
  }
}

// ─── Helpers ───────────────────────────────────────────────────────
function textPositions(
  text: string, cx: number, cy: number,
  fs: number, cw: number, ch: number, step: number
): Array<{ x: number; y: number }> {
  const oc  = document.createElement("canvas")
  oc.width  = cw; oc.height = ch
  const ctx = oc.getContext("2d", { willReadFrequently: true })!
  ctx.fillStyle = "white"
  ctx.font = `bold ${fs}px Arial`
  ctx.textAlign = "center"; ctx.textBaseline = "middle"
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
export interface HeroParticleIntroHandle {
  skip: () => void
}

interface Props {
  onWordFormed: () => void
  onComplete: () => void
}

export function HeroParticleIntro({ onWordFormed, onComplete }: Props) {
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const onFormedRef     = useRef(onWordFormed)
  const onCompleteRef   = useRef(onComplete)
  const phaseRef        = useRef(0)   // 0=forming 1=hold 2=burst 3=reform 4=hold2 5=done
  const frameRef        = useRef(0)
  const rafRef          = useRef<number>(0)
  const doneRef         = useRef(false)

  onFormedRef.current   = onWordFormed
  onCompleteRef.current = onComplete

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W   = canvas.offsetWidth  || 1200
    const H   = canvas.offsetHeight || 600
    canvas.width  = W
    canvas.height = H

    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "rgb(2,6,23)"
    ctx.fillRect(0, 0, W, H)

    const particles: P[] = []
    const mob  = W < 700
    const STEP = mob ? 7 : 9   // fewer pixels sampled → fewer particles on mobile

    // Font sizes
    const fSrc = Math.min(Math.max((W / (mob ? 10 : 20)) | 0, 30), 90)
    const fFin = Math.min(Math.max((W / (mob ? 7  : 12)) | 0, 40), 120)

    const WHITE: [number, number, number] = [255, 255, 255]
    const BLUE:  [number, number, number] = [96,  165, 250]

    // ── Phase thresholds (frames @ ~60 fps) ──────────────────────
    const T = { hold: 155, burst: 205, reform: 248, hold2: 430, done: 520 }

    // ── Form both source words ────────────────────────────────────
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
        const p     = new P()
        p.x         = pos.left ? -80 - Math.random() * 80 : W + Math.random() * 80
        p.y         = H * 0.3 + Math.random() * H * 0.4
        p.vx        = pos.left ? Math.random() * 3 : -Math.random() * 3
        p.spd       = Math.random() * 4 + 7
        p.frc       = p.spd * 0.07
        p.rate      = Math.random() * 0.025 + 0.012
        // Pre-set to target colour so no colour-blend on initial fly-in
        p.r = p.sr = p.tr = pos.c[0]
        p.g = p.sg = p.tg = pos.c[1]
        p.b = p.sb = p.tb = pos.c[2]
        p.blend     = 1
        p.setTarget(pos.x, pos.y, pos.c[0], pos.c[1], pos.c[2])
        particles.push(p)
      }
    }

    // ── Reform as final word ──────────────────────────────────────
    const reformWord = () => {
      const pts = shuffle(textPositions("Regenovate", W * 0.5, H * 0.5, fFin, W, H, STEP))
      let idx = 0

      for (const pos of pts) {
        let p: P
        if (idx < particles.length) {
          p = particles[idx]
          p.dead   = false
          p.spd    = Math.random() * 4 + 6
          p.frc    = p.spd * 0.07
        } else {
          p = new P()
          p.x      = Math.random() * W
          p.y      = Math.random() * H
          p.spd    = Math.random() * 4 + 6
          p.frc    = p.spd * 0.07
          particles.push(p)
        }
        p.setTarget(pos.x, pos.y, 255, 255, 255)
        idx++
      }
      for (let i = idx; i < particles.length; i++) particles[i].kill(W, H)
    }

    formWords()

    // ── Animation loop ────────────────────────────────────────────
    const tick = () => {
      // Semi-transparent clear → motion trail
      ctx.fillStyle = "rgba(2,6,23,0.22)"
      ctx.fillRect(0, 0, W, H)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()
        ctx.fillStyle = `rgb(${p.r | 0},${p.g | 0},${p.b | 0})`
        ctx.fillRect(p.x | 0, p.y | 0, 2, 2)
        // Prune dead particles that have left the viewport
        if (p.dead && (p.x < -160 || p.x > W + 160 || p.y < -160 || p.y > H + 160))
          particles.splice(i, 1)
      }

      const f = ++frameRef.current
      const ph = phaseRef.current

      if (ph === 0 && f >= T.hold)   phaseRef.current = 1
      if (ph === 1 && f >= T.burst)  { phaseRef.current = 2; particles.forEach(p => p.kill(W, H)) }
      if (ph === 2 && f >= T.reform) { phaseRef.current = 3; reformWord() }
      if (ph === 3 && f >= T.hold2)  { phaseRef.current = 4; onFormedRef.current() }
      if (ph === 4 && f >= T.done && !doneRef.current) {
        doneRef.current = true
        onCompleteRef.current()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
}
