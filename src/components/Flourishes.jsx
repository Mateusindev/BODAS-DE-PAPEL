import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// Barra de progresso de scroll — fio dourado no topo.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(to right, transparent, var(--accent), var(--accent-2))',
        boxShadow: '0 0 10px var(--accent)',
      }}
    />
  )
}

// Brilho suave seguindo o cursor (desktop com mouse fino).
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  if (!enabled) return null
  return (
    <div
      className="pointer-events-none fixed z-[45] h-72 w-72 rounded-full blur-3xl transition-transform duration-200 ease-out"
      style={{
        left: pos.x - 144,
        top: pos.y - 144,
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
