"use client"

import { useEffect, useRef, useCallback } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move(mouseX: number, mouseY: number, mouseRadius: number) {
    // Mouse repulsion — push particles away from cursor
    const mdx = this.pos.x - mouseX
    const mdy = this.pos.y - mouseY
    const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)

    if (mouseDist < mouseRadius && mouseDist > 0) {
      const repulse = (mouseRadius - mouseDist) / mouseRadius
      this.acc.x += (mdx / mouseDist) * repulse * 2.5
      this.acc.y += (mdy / mouseDist) * repulse * 2.5
    }

    // Steering towards target
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, glow: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)

    if (glow) {
      // Subtle glow around each particle
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`
      ctx.shadowBlur = 6
    }

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)

    if (glow) {
      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const dist = (width + height) / 2
      this.target.x = width / 2 + Math.cos(angle) * dist
      this.target.y = height / 2 + Math.sin(angle) * dist

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
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
  pixelSteps?: number
  mouseRadius?: number
  glow?: boolean
  /** Called with word index each time a new word begins forming */
  onWordChange?: (index: number) => void
}

const DEFAULT_WORDS = ["HELLO", "21st.dev", "ParticleTextEffect"]

export function ParticleTextEffect({
  words = DEFAULT_WORDS,
  colors,
  transitionInterval = 240,
  width = 1000,
  height = 500,
  fontSize = 100,
  bgColor = "rgba(0, 0, 0, 0.1)",
  className = "",
  fontFamily = "Arial",
  pixelSteps = 6,
  mouseRadius = 80,
  glow = false,
  onWordChange,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const getColor = useCallback(
    (index: number) => {
      if (colors && colors.length > 0) {
        return colors[index % colors.length]
      }
      return {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
      }
    },
    [colors],
  )

  const nextWord = useCallback(
    (word: string, canvas: HTMLCanvasElement, colorIndex: number) => {
      const offscreenCanvas = document.createElement("canvas")
      offscreenCanvas.width = canvas.width
      offscreenCanvas.height = canvas.height
      const offscreenCtx = offscreenCanvas.getContext("2d")!

      offscreenCtx.fillStyle = "white"
      offscreenCtx.font = `bold ${fontSize}px ${fontFamily}`
      offscreenCtx.textAlign = "center"
      offscreenCtx.textBaseline = "middle"
      offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)

      const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      const newColor = getColor(colorIndex)
      const particles = particlesRef.current
      let particleIndex = 0

      const coordsIndexes: number[] = []
      for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
        coordsIndexes.push(i)
      }

      // Shuffle for organic motion
      for (let i = coordsIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
      }

      for (const coordIndex of coordsIndexes) {
        const alpha = pixels[coordIndex + 3]

        if (alpha > 0) {
          const x = (coordIndex / 4) % canvas.width
          const y = Math.floor(coordIndex / 4 / canvas.width)

          let particle: Particle

          if (particleIndex < particles.length) {
            particle = particles[particleIndex]
            particle.isKilled = false
            particleIndex++
          } else {
            particle = new Particle()

            // Spawn from random edge position
            const edge = Math.floor(Math.random() * 4)
            if (edge === 0) { particle.pos.x = Math.random() * canvas.width; particle.pos.y = -50 }
            else if (edge === 1) { particle.pos.x = canvas.width + 50; particle.pos.y = Math.random() * canvas.height }
            else if (edge === 2) { particle.pos.x = Math.random() * canvas.width; particle.pos.y = canvas.height + 50 }
            else { particle.pos.x = -50; particle.pos.y = Math.random() * canvas.height }

            particle.maxSpeed = Math.random() * 3 + 2
            particle.maxForce = particle.maxSpeed * 0.04
            particle.particleSize = Math.random() * 4 + 3
            particle.colorBlendRate = Math.random() * 0.015 + 0.002

            particles.push(particle)
          }

          particle.startColor = {
            r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
            g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
            b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
          }
          particle.targetColor = newColor
          particle.colorWeight = 0
          particle.target.x = x
          particle.target.y = y
        }
      }

      for (let i = particleIndex; i < particles.length; i++) {
        particles[i].kill(canvas.width, canvas.height)
      }
    },
    [fontSize, fontFamily, pixelSteps, getColor],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    nextWord(words[0], canvas, 0)
    onWordChange?.(0)

    const animate = () => {
      const ctx = canvas.getContext("2d")!
      const particles = particlesRef.current
      const mouse = mouseRef.current

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.move(mouse.x, mouse.y, mouseRadius)
        particle.draw(ctx, glow)

        if (particle.isKilled) {
          if (
            particle.pos.x < -100 ||
            particle.pos.x > canvas.width + 100 ||
            particle.pos.y < -100 ||
            particle.pos.y > canvas.height + 100
          ) {
            particles.splice(i, 1)
          }
        }
      }

      frameCountRef.current++
      if (frameCountRef.current % transitionInterval === 0) {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        nextWord(words[wordIndexRef.current], canvas, wordIndexRef.current)
        onWordChange?.(wordIndexRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
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
      cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [words, width, height, bgColor, transitionInterval, mouseRadius, glow, nextWord, onWordChange])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  )
}
