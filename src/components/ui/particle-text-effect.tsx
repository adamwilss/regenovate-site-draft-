"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  size: number
  baseSize: number
  r: number
  g: number
  b: number
  targetR: number
  targetG: number
  targetB: number
  colorProgress: number
  alive: boolean
  settled: boolean
  phase: number // for breathing animation
}

interface ParticleTextEffectProps {
  words?: string[]
  colors?: Array<{ r: number; g: number; b: number }>
  transitionInterval?: number
  width?: number
  height?: number
  fontSize?: number
  bgColor?: string
  className?: string
  fontFamily?: string
  particleSpacing?: number
  mouseRadius?: number
  connectionDistance?: number
  onWordChange?: (index: number) => void
}

export function ParticleTextEffect({
  words = ["Hello", "World"],
  colors,
  transitionInterval = 300,
  width = 1000,
  height = 500,
  fontSize = 90,
  bgColor = "transparent",
  className = "",
  fontFamily = "Arial",
  particleSpacing = 4,
  mouseRadius = 100,
  connectionDistance = 40,
  onWordChange,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef(0)
  const wordIdxRef = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const getColor = useCallback(
    (index: number) => {
      if (colors && colors.length > 0) return colors[index % colors.length]
      const hue = (index * 137) % 360
      // Convert HSL to RGB (rough)
      const h = hue / 60
      const c = 200
      const x = c * (1 - Math.abs((h % 2) - 1))
      let r = 0, g = 0, b = 0
      if (h < 1) { r = c; g = x } else if (h < 2) { r = x; g = c } else if (h < 3) { g = c; b = x } else if (h < 4) { g = x; b = c } else if (h < 5) { r = x; b = c } else { r = c; b = x }
      return { r: Math.round(r + 55), g: Math.round(g + 55), b: Math.round(b + 55) }
    },
    [colors],
  )

  const sampleText = useCallback(
    (word: string, w: number, h: number): Array<{ x: number; y: number }> => {
      const offscreen = document.createElement("canvas")
      offscreen.width = w
      offscreen.height = h
      const ctx = offscreen.getContext("2d")!

      ctx.fillStyle = "white"
      ctx.font = `bold ${fontSize}px ${fontFamily}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(word, w / 2, h / 2)

      const imageData = ctx.getImageData(0, 0, w, h)
      const pixels = imageData.data
      const points: Array<{ x: number; y: number }> = []

      for (let y = 0; y < h; y += particleSpacing) {
        for (let x = 0; x < w; x += particleSpacing) {
          const i = (y * w + x) * 4
          if (pixels[i + 3] > 128) {
            points.push({ x, y })
          }
        }
      }

      return points
    },
    [fontSize, fontFamily, particleSpacing],
  )

  const setWord = useCallback(
    (word: string, colorIndex: number, canvasW: number, canvasH: number) => {
      const targets = sampleText(word, canvasW, canvasH)
      const color = getColor(colorIndex)
      const particles = particlesRef.current

      // Shuffle targets for organic feel
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[targets[i], targets[j]] = [targets[j], targets[i]]
      }

      const needed = targets.length
      const existing = particles.length

      // Assign targets to existing particles
      for (let i = 0; i < Math.min(needed, existing); i++) {
        const p = particles[i]
        p.targetX = targets[i].x
        p.targetY = targets[i].y
        p.targetR = color.r
        p.targetG = color.g
        p.targetB = color.b
        p.colorProgress = 0
        p.alive = true
        p.settled = false
      }

      // Create new particles if needed
      for (let i = existing; i < needed; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.max(canvasW, canvasH) * 0.6
        const baseSize = 1.5 + Math.random() * 2
        particles.push({
          x: canvasW / 2 + Math.cos(angle) * dist,
          y: canvasH / 2 + Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          targetX: targets[i].x,
          targetY: targets[i].y,
          size: baseSize,
          baseSize,
          r: 0, g: 0, b: 0,
          targetR: color.r,
          targetG: color.g,
          targetB: color.b,
          colorProgress: 0,
          alive: true,
          settled: false,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Kill excess particles
      for (let i = needed; i < existing; i++) {
        const p = particles[i]
        const angle = Math.random() * Math.PI * 2
        const dist = Math.max(canvasW, canvasH) * 0.7
        p.targetX = canvasW / 2 + Math.cos(angle) * dist
        p.targetY = canvasH / 2 + Math.sin(angle) * dist
        p.targetR = 0
        p.targetG = 0
        p.targetB = 0
        p.colorProgress = 0
        p.alive = false
        p.settled = false
      }
    },
    [sampleText, getColor],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    setWord(words[0], 0, width, height)
    onWordChange?.(0)

    const ease = 0.06
    const friction = 0.85
    const mouseForce = 3.5
    const colorSpeed = 0.02
    const breathSpeed = 0.015
    const breathAmount = 0.4

    const animate = () => {
      const ctx = canvas.getContext("2d")!
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Clean clear
      ctx.clearRect(0, 0, width, height)

      // Optional background
      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
      }

      // Update particles
      let aliveCount = 0
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // Mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < mouseRadius && mDist > 0) {
          const force = ((mouseRadius - mDist) / mouseRadius) * mouseForce
          p.vx += (mdx / mDist) * force
          p.vy += (mdy / mDist) * force
        }

        // Spring toward target
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        p.vx += dx * ease
        p.vy += dy * ease
        p.vx *= friction
        p.vy *= friction
        p.x += p.vx
        p.y += p.vy

        // Check if settled
        const dist = Math.sqrt(dx * dx + dy * dy)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        p.settled = dist < 2 && speed < 0.5

        // Breathing animation when settled
        p.phase += breathSpeed
        if (p.settled) {
          p.size = p.baseSize + Math.sin(p.phase) * breathAmount
        } else {
          p.size = p.baseSize
        }

        // Color interpolation
        if (p.colorProgress < 1) {
          p.colorProgress = Math.min(p.colorProgress + colorSpeed, 1)
          const t = p.colorProgress
          p.r = p.r + (p.targetR - p.r) * t
          p.g = p.g + (p.targetG - p.g) * t
          p.b = p.b + (p.targetB - p.b) * t
        }

        // Remove dead particles that are off-screen
        if (!p.alive) {
          if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
            particles.splice(i, 1)
            continue
          }
        }

        aliveCount++
      }

      // Draw connections between nearby particles
      if (connectionDistance > 0) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]
            const cdx = a.x - b.x
            const cdy = a.y - b.y
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
            if (cdist < connectionDistance) {
              const opacity = (1 - cdist / connectionDistance) * 0.12
              const cr = Math.round((a.r + b.r) / 2)
              const cg = Math.round((a.g + b.g) / 2)
              const cb = Math.round((a.b + b.b) / 2)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(${cr},${cg},${cb},${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      // Draw particles with glow
      for (const p of particles) {
        const r = Math.round(p.r)
        const g = Math.round(p.g)
        const b = Math.round(p.b)
        const alpha = p.alive ? 1 : Math.max(0, 1 - p.colorProgress)

        if (alpha <= 0) continue

        // Outer glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `rgba(${r},${g},${b},${0.3 * alpha})`)
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(p.x - p.size * 3, p.y - p.size * 3, p.size * 6, p.size * 6)

        // Core particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * alpha})`
        ctx.fill()

        // Bright center
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.4 * alpha})`
        ctx.fill()
      }

      // Advance words
      frameRef.current++
      if (frameRef.current % transitionInterval === 0) {
        wordIdxRef.current = (wordIdxRef.current + 1) % words.length
        setWord(words[wordIdxRef.current], wordIdxRef.current, width, height)
        onWordChange?.(wordIdxRef.current)
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animRef.current)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [words, width, height, bgColor, transitionInterval, mouseRadius, connectionDistance, setWord, onWordChange])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  )
}
