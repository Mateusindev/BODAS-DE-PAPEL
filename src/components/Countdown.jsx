import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { couple } from '../config'
import { SectionTitle } from './Timeline'

function diff(from) {
  const ms = Date.now() - new Date(from).getTime()
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

// Um dígito que "vira" (odometer) ao mudar.
function Digit({ value }) {
  return (
    <span className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden tabular-nums">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label }) {
  const digits = String(value).padStart(2, '0').split('')
  return (
    <div className="flex flex-col items-center">
      <div className="panel flex rounded-xl px-3 py-4 font-serif text-4xl md:text-6xl" style={{ color: 'var(--accent)' }}>
        {digits.map((d, i) => (
          <Digit key={i} value={d} />
        ))}
      </div>
      <span className="mt-3 text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [t, setT] = useState(() => diff(couple.weddingDate))
  useEffect(() => {
    const id = setInterval(() => setT(diff(couple.weddingDate)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
      <SectionTitle sup="desde o sim" title="Nosso tempo juntos" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-14 flex items-start justify-center gap-3 md:gap-6"
      >
        <Unit value={t.days} label="dias" />
        <Unit value={t.hours} label="horas" />
        <Unit value={t.minutes} label="min" />
        <Unit value={t.seconds} label="seg" />
      </motion.div>
    </section>
  )
}
