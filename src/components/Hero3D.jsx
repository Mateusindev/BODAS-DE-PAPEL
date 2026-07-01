import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { couple } from '../config'
import { useTheme } from '../theme'
import RoseScene from './Rose'

// -------- Campo de partículas flutuantes (pólen/luz/estrelas) --------
function Particles({ count = 900, mode }) {
  const ref = useRef()
  const { viewport } = useThree()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      speeds[i] = 0.15 + Math.random() * 0.4
    }
    return { positions, speeds }
  }, [count])

  // Movimento suave para cima + parallax de mouse
  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return
    const arr = pts.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.35
      if (arr[i * 3 + 1] > 7) arr[i * 3 + 1] = -7
    }
    pts.geometry.attributes.position.needsUpdate = true
    // parallax leve seguindo o mouse
    const mx = state.pointer.x * 0.4
    const my = state.pointer.y * 0.25
    pts.rotation.y += (mx - pts.rotation.y) * 0.04
    pts.rotation.x += (-my - pts.rotation.x) * 0.04
  })

  const color = mode === 'night' ? '#e8d4a0' : '#c47a3d'

  return (
    <points ref={ref} scale={[viewport.width / 12, viewport.width / 12, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={mode === 'night' ? 0.06 : 0.05}
        color={color}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// -------- Título letra por letra --------
function AnimatedTitle({ text, className, delay = 0 }) {
  const letters = Array.from(text)
  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 28, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.045, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero3D() {
  const { mode } = useTheme()

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* fundo gradiente do tema */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--bg-top), var(--bg-bottom) 70%)' }}
      />

      {/* Cena 3D */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.8]}>
            {/* Rosa 3D (modelo GLB) — foco da cena */}
            <Suspense fallback={null}>
              <RoseScene mode={mode} />
            </Suspense>
            {/* partículas suaves ao redor (pólen/luz) */}
            <Particles mode={mode} count={window.innerWidth < 640 ? 300 : 600} />
          </Canvas>
        </Suspense>
      </div>

      {/* scrim radial suave atrás do texto p/ legibilidade sobre a rosa */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(5,5,16,0.55), transparent 70%)' }}
      />

      {/* Título + tagline */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-4 text-xs uppercase tracking-[0.5em]"
          style={{ color: 'var(--ink-soft)' }}
        >
          {couple.weddingDateLabel}
        </motion.p>

        <h1 className="font-serif leading-none" style={{ color: 'var(--ink)' }}>
          <AnimatedTitle
            text={couple.name1}
            className="block text-5xl sm:text-7xl md:text-8xl"
            delay={0.3}
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="my-2 block text-2xl italic sm:text-4xl"
            style={{ color: 'var(--accent)' }}
          >
            &amp;
          </motion.span>
          <AnimatedTitle
            text={couple.name2}
            className="block text-5xl sm:text-7xl md:text-8xl"
            delay={1.1}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mt-6 font-serif text-xl italic sm:text-2xl"
          style={{ color: 'var(--ink-soft)' }}
        >
          {couple.tagline}
        </motion.p>

        {/* Scroll indicator */}
        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em]"
          style={{ color: 'var(--ink-soft)' }}
        >
          role para nossa história
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-9 w-6 items-start justify-center rounded-full border pt-2"
            style={{ borderColor: 'var(--panel-border)' }}
          >
            <span className="h-2 w-1 rounded-full" style={{ background: 'var(--accent)' }} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
