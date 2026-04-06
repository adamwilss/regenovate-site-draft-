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

  burst() {
    if (this.dead) return
    this.dead = true
    const a   = Math.random() * Math.PI * 2
    const spd = 8 + Math.random() * 7
    this.vx   = Math.cos(a) * spd
    this.vy   = Math.sin(a) * spd
    this.tx   = this.x + Math.cos(a) * 3000
    this.ty   = this.y + Math.sin(a) * 3000
    this.sr   = this.r | 0; this.sg = this.g | 0; this.sb = this.b | 0
    this.tr   = 13; this.tg = 27; this.tb = 62
    this.blend = 0
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
  onWordFormed:   () => void
  onComplete:     () => void
  onSettleBegin?: () => void
  skipRef?:       React.MutableRefObject<(() => void) | null>
}

export function HeroParticleIntro({ onWordFormed, onComplete, onSettleBegin, skipRef }: Props) {
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

    // ── Colours — hero is always dark ────────────────────────────
    const bgR = 6, bgG = 7, bgB = 13   // #06070d

    ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`
    ctx.fillRect(0, 0, W, H)

    const particles: P[] = []
    const mob  = W < 700
    const STEP = mob ? 7 : 9

    const fSrc = Math.min(Math.max((W / (mob ? 8 : 15)) | 0, 40), 120)  // larger, more standout
    const fFin = Math.min(Math.max((W / (mob ? 8  : 15)) | 0, 36), 100)

    const WHITE: [number, number, number] = [255, 255, 255]
    const BLUE:  [number, number, number] = [56,  189, 248]

    // ── Phase thresholds (milliseconds, display-rate independent) ───
    // 0 forming → 1 hold → 2 burst → 3 reform → 4 hold2
    // → 5 reformR → 6 holdR → 7 settle → done
    const T = { hold: 2583, burst: 3417, reform: 4000, hold2: 6667, reformR: 7333, holdR: 9333, settle: 10000, done: 12667 }

    const formWords = () => {
      // Innovate left, Regenerate right (swapped)
      const cx1 = mob ? W * 0.5 : W * 0.28
      const cy1 = mob ? H * 0.37 : H * 0.5
      const cx2 = mob ? W * 0.5 : W * 0.72
      const cy2 = mob ? H * 0.63 : H * 0.5

      type Tagged = { x: number; y: number; c: [number,number,number]; left: boolean }
      const iPts: Tagged[] = shuffle(textPositions("Innovate",   cx1, cy1, fSrc, W, H, STEP))
        .map(p => ({ ...p, c: BLUE,  left: true  }))
      const rPts: Tagged[] = shuffle(textPositions("Regenerate", cx2, cy2, fSrc, W, H, STEP))
        .map(p => ({ ...p, c: WHITE, left: false }))

      for (const pos of [...iPts, ...rPts]) {
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

    const reformWord = () => {
      const pts = shuffle(textPositions("Regenovate", W * 0.5, H * 0.5, fFin, W, H, STEP))

      for (let i = 0; i < Math.min(pts.length, particles.length); i++) {
        const p   = particles[i]
        const pos = pts[i]
        p.spd  = Math.random() * 5 + 12
        p.frc  = p.spd * 0.08
        p.rate = Math.random() * 0.02 + 0.015
        p.setTarget(pos.x, pos.y, p.srcR, p.srcG, p.srcB)
      }
      for (let i = pts.length; i < particles.length; i++) {
        const p = particles[i]
        if (!p.dead) { p.burst(); p.tr = bgR; p.tg = bgG; p.tb = bgB }
        const a = Math.random() * Math.PI * 2
        p.tx = W / 2 + Math.cos(a) * (W + 200)
        p.ty = H / 2 + Math.sin(a) * (H + 200)
      }
    }

    const reformToR = () => {
      const rFs    = Math.min(Math.max((W * 0.30) | 0, 150), 400)
      const mc     = document.createElement("canvas")
      const mctx   = mc.getContext("2d")!
      mctx.font    = `bold ${rFs}px Arial`
      const fullW  = mctx.measureText("R.").width
      const rCharW = mctx.measureText("R").width
      // On mobile the hero text fills the vertical centre, so push R. to the
      // bottom-right corner where it sits clear of all content.
      const cx  = mob ? W * 0.78 : W * 0.76
      const cy  = mob ? H * 0.84 : H * 0.5
      const startX = cx - fullW / 2

      const IR: [number,number,number] = [58, 123, 255]
      const ID: [number,number,number] = [18, 22, 42]

      type Colored = { x: number; y: number; c: [number,number,number] }
      const allPts: Colored[] = [
        ...textPositions("R", startX,          cy, rFs, W, H, STEP, "left").map(p => ({ ...p, c: IR })),
        ...textPositions(".", startX + rCharW, cy, rFs, W, H, STEP, "left").map(p => ({ ...p, c: ID })),
      ]
      shuffle(allPts)

      for (let i = 0; i < Math.min(allPts.length, particles.length); i++) {
        const p   = particles[i]
        const pos = allPts[i]
        p.spd  = Math.random() * 6 + 22   // faster — was 5+12
        p.frc  = p.spd * 0.09
        p.rate = Math.random() * 0.03 + 0.025
        p.setTarget(pos.x, pos.y, pos.c[0], pos.c[1], pos.c[2])
      }
      for (let i = allPts.length; i < particles.length; i++) {
        const p = particles[i]
        if (!p.dead) { p.burst(); p.tr = bgR; p.tg = bgG; p.tb = bgB }
        const a = Math.random() * Math.PI * 2
        p.tx = W / 2 + Math.cos(a) * (W + 200)
        p.ty = H / 2 + Math.sin(a) * (H + 200)
      }
    }

    // Soften the spring on each particle so mouse repulsion is satisfying
    // but keeps pulling them back to their exact R. positions
    const settleInPlace = () => {
      particles.forEach(p => {
        p.spd = 1.5 + Math.random() * 1.5   // soft spring — mouse can push it
        p.frc = 0.06
        p.sz  = 2.5                          // visible dot size
      })
      onSettleBeginRef.current?.()
    }

    formWords()

    let phase      = 0
    let done       = false
    let timeOffset = 0
    const startTime = performance.now()
    let rafId    = 0
    let bgAlpha  = 0.22         // fades to 0 during settle, revealing hero bg
    let mouseX   = -9999
    let mouseY   = -9999
    let pausedAt = 0
    const MOUSE_RADIUS   = 130
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS

    // Mouse tracking via window so hero content doesn't block it
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) * (W / rect.width)
      mouseY = (e.clientY - rect.top)  * (H / rect.height)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.touches[0].clientX - rect.left) * (W / rect.width)
      mouseY = (e.touches[0].clientY - rect.top)  * (H / rect.height)
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove, { passive: true })

    // Pause RAF when tab is hidden — no wasted work, and resume without skipping phases
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
        pausedAt = performance.now()
      } else {
        timeOffset -= performance.now() - pausedAt  // subtract hidden duration so phases don't skip
        rafId = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    // Skip: jump straight to R. on the right, then settle
    if (skipRef) {
      skipRef.current = () => {
        reformToR()
        phase = 5
        // Fast-forward elapsed to just past holdR so settle fires normally (~667ms later)
        timeOffset = Math.max(0, T.holdR - (performance.now() - startTime))
      }
    }

    // Cap physics to 60fps — particle velocity is frame-rate dependent,
    // so 140Hz would run 2.3x faster than 60Hz without this gate.
    let lastTickTime = 0
    const tick = (now: number) => {
      if (now - lastTickTime < 16) { rafId = requestAnimationFrame(tick); return }
      lastTickTime = now
      // ── Background ────────────────────────────────────────────────
      if (phase >= 7) {
        // Settle phase: always clearRect first so mouse-repelled dots
        // leave no ghost trails. Dark bg then fades out on top.
        bgAlpha = bgAlpha > 0.002 ? bgAlpha * 0.93 : 0
        ctx.clearRect(0, 0, W, H)
        if (bgAlpha > 0) {
          ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},${bgAlpha})`
          ctx.fillRect(0, 0, W, H)
        }
      } else {
        // Intro phases: semi-transparent fill gives intentional motion-blur trail
        ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},0.22)`
        ctx.fillRect(0, 0, W, H)
      }

      // ── Particles ─────────────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.update()

        // Mouse repulsion — active after settle, creates satisfying ripple
        // Fast-reject with squared distance before sqrt
        if (phase >= 7) {
          const dx     = p.x - mouseX
          const dy     = p.y - mouseY
          const distSq = dx * dx + dy * dy
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0.01) {
            const dist = Math.sqrt(distSq)
            const strength = (1 - dist / MOUSE_RADIUS) * 1.6
            p.vx += (dx / dist) * strength
            p.vy += (dy / dist) * strength
          }
          // Damp velocity so repulsed dots decelerate quickly and don't streak
          p.vx *= 0.82
          p.vy *= 0.82
        }

        ctx.fillStyle = `rgb(${p.r | 0},${p.g | 0},${p.b | 0})`
        ctx.fillRect(p.x | 0, p.y | 0, p.sz, p.sz)

        if (phase >= 4 && p.dead &&
            (p.x < -200 || p.x > W + 200 || p.y < -200 || p.y > H + 200))
          particles.splice(i, 1)
      }

      // ── Phase transitions ──────────────────────────────────────────
      const elapsed = performance.now() - startTime + timeOffset
      if (phase === 0 && elapsed >= T.hold)    phase = 1
      if (phase === 1 && elapsed >= T.burst)   { phase = 2; particles.forEach(p => { p.burst(); p.tr = bgR; p.tg = bgG; p.tb = bgB }) }
      if (phase === 2 && elapsed >= T.reform)  { phase = 3; reformWord() }
      if (phase === 3 && elapsed >= T.hold2)   { phase = 4; onFormedRef.current() }
      if (phase === 4 && elapsed >= T.reformR) { phase = 5; reformToR() }
      if (phase === 5 && elapsed >= T.holdR)   { phase = 6 }
      if (phase === 6 && elapsed >= T.settle)  { phase = 7; settleInPlace() }
      if (phase >= 7 && elapsed >= T.done && !done) {
        done = true
        onCompleteRef.current()
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  // Canvas is persistent — no pointer-events-none so mouse events reach it
  // z-[3]: above orbs/grid, below skip button and hero content
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ zIndex: 3 }}
    />
  )
}
