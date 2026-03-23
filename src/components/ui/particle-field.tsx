"use client"

import { useEffect, useRef, useCallback } from "react"

interface AmbientParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseOpacity: number
  hue: number
  connections: number[]
}

interface ParticleFieldProps {
  className?: string
  particleCount?: number
  connectionDistance?: number
  mouseRadius?: number
  baseHue?: number
}

export function ParticleField({
  className = "",
  particleCount = 80,
  connectionDistance = 120,
  mouseRadius = 150,
  baseHue = 160,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<AmbientParticle[]>([])
  const dimsRef = useRef({ w: 0, h: 0 })

  const initParticles = useCallback(
    (w: number, h: number) => {
      const particles: AmbientParticle[] = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          baseOpacity: Math.random() * 0.5 + 0.1,
          hue: baseHue + (Math.random() - 0.5) * 30,
          connections: [],
        })
      }
      particlesRef.current = particles
    },
    [particleCount, baseHue],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      dimsRef.current = { w: canvas.width, h: canvas.height }
      const ctx = canvas.getContext("2d")!
      ctx.scale(dpr, dpr)
      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height)
      }
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    window.addEventListener("mousemove", handleMouse)

    const animate = () => {
      const ctx = canvas.getContext("2d")!
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius
          p.vx += (dx / dist) * force * 0.8
          p.vy += (dy / dist) * force * 0.8
          p.opacity = Math.min(p.baseOpacity + force * 0.5, 1)
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02
        }

        // Drift
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98

        // Wrap around
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cdx = p.x - p2.x
          const cdy = p.y - p2.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

          if (cdist < connectionDistance) {
            const lineOpacity = (1 - cdist / connectionDistance) * 0.15 * Math.min(p.opacity, p2.opacity) * 2
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 60%, 55%, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseRadius)
        gradient.addColorStop(0, `hsla(${baseHue}, 80%, 60%, 0.06)`)
        gradient.addColorStop(1, `hsla(${baseHue}, 80%, 60%, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(mouse.x - mouseRadius, mouse.y - mouseRadius, mouseRadius * 2, mouseRadius * 2)
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [initParticles, connectionDistance, mouseRadius, baseHue])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
}
