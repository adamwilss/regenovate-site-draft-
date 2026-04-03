"use client"

import { useEffect, useRef } from "react"

// ─── Particle ──────────────────────────────────────────────────────
class P {
  x = 0; y = 0; vx = 0; vy = 0
  tx = 0; ty = 0
  r = 255; g = 255; b = 255
  tr = 255; tg = 255; tb = 255
  sr = 255; sg = 255; sb = 255
  srcR = 255; srcG = 255; srcB = 255
  blend = 1; rate = 0.025
  spd = 8; frc = 0.4
  dead = false
  sz = 2

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

  settleToAmbient(tx: number, ty: number) {
    this.tx   = tx
    this.ty   = ty
    this.frc  = 0.06
    this.spd  = 0.4
    this.rate = 0.008
    this.sz   = 1
    this.sr = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr = 70  + Math.random() * 40
    this.tg = 155 + Math.random() * 20
    this.tb = 245 + Math.random() * 10
    this.blend = 0
    this.dead  = false
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

    // ── Phase thresholds (frames at ~60fps) ──────────────────────
    // 0 forming → 1 hold → 2 settle → done
    const T = { hold: 110, settle: 160, done: 330 }

    // ── Form R. on the right side of the screen ──────────────────
    const formR = () => {
      const rFs    = Math.min(Math.max((W * (mob ? 0.42 : 0.30)) | 0, 140), 420)
      // On desktop: right third of screen. On mobile: centred.
      const cx     = mob ? W * 0.5 : W * 0.76

      // Measure glyph widths so R and . can be positioned independently
      const mc   = document.createElement("canvas")
      const mctx = mc.getContext("2d")!
      mctx.font  = `bold ${rFs}px Arial`
      const fullW  = mctx.measureText("R.").width
      const rCharW = mctx.measureText("R").width
      // Centre the combined "R." at cx
      const startX = cx - fullW / 2

      const IR: [number,number,number] = [58, 123, 255]   // brand blue — R body
      const ID: [number,number,number] = [50, 90,  180]   // dimmer blue — dot

      type Colored = { x: number; y: number; c: [number,number,number] }
      const allPts: Colored[] = [
        ...textPositions("R", startX,          H * 0.5, rFs, W, H, STEP, "left").map(p => ({ ...p, c: IR })),
        ...textPositions(".", startX + rCharW, H * 0.5, rFs, W, H, STEP, "left").map(p => ({ ...p, c: ID })),
      ]
      shuffle(allPts)

      // Spawn particles streaming in from all four edges
      for (const pos of allPts) {
        const p    = new P()
        const side = Math.floor(Math.random() * 4)
        if      (side === 0) { p.x = -80;      p.y = Math.random() * H }
        else if (side === 1) { p.x = W + 80;   p.y = Math.random() * H }
        else if (side === 2) { p.x = Math.random() * W; p.y = -80 }
        else                 { p.x = Math.random() * W; p.y = H + 80 }

        p.vx   = (Math.random() - 0.5) * 3
        p.vy   = (Math.random() - 0.5) * 3
        p.spd  = Math.random() * 4 + 7
        p.frc  = p.spd * 0.07
        p.rate = Math.random() * 0.025 + 0.012
        p.r = p.sr = p.tr = pos.c[0]
        p.g = p.sg = p.tg = pos.c[1]
        p.b = p.sb = p.tb = pos.c[2]
        p.srcR = pos.c[0]; p.srcG = pos.c[1]; p.srcB = pos.c[2]
        p.blend = 1
        p.setTarget(pos.x, pos.y, pos.c[0], pos.c[1], pos.c[2])
        particles.push(p)
      }
    }

    // Pre-compute scatter targets for settle phase
    const settleTargets = Array.from({ length: 2000 },
      () => ({ x: Math.random() * W, y: Math.random() * H }))

    formR()

    let phase = 0
    let frame = 0
    let done  = false
    let rafId = 0

    const tick = () => {
      // Settle phase uses lighter trail so dots fade gracefully
      ctx.fillStyle = phase >= 2
        ? "rgba(13,27,62,0.12)"
        : "rgba(13,27,62,0.22)"
      ctx.fillRect(0, 0, W, H)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()
        ctx.fillStyle = `rgb(${p.r | 0},${p.g | 0},${p.b | 0})`
        ctx.fillRect(p.x | 0, p.y | 0, p.sz, p.sz)

        if (phase >= 2 && p.dead &&
            (p.x < -200 || p.x > W + 200 || p.y < -200 || p.y > H + 200))
          particles.splice(i, 1)
      }

      frame++

      // R. fully formed — hold and signal hero content to begin appearing
      if (phase === 0 && frame >= T.hold) {
        phase = 1
        onFormedRef.current()
        onSettleBeginRef.current?.()
      }

      // Gently scatter particles to ambient background dots
      if (phase === 1 && frame >= T.settle) {
        phase = 2
        shuffle(settleTargets)
        particles.forEach((p, i) => {
          const t = settleTargets[i % settleTargets.length]
          p.settleToAmbient(t.x, t.y)
        })
      }

      // Complete — remove intro overlay
      if (phase >= 2 && frame >= T.done && !done) {
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
