import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { closing } from '../config'

// Encerramento + easter egg: SEGURAR o coração revela mensagem escondida.
export default function Closing({ onReplay }) {
  const [secret, setSecret] = useState(false)
  const timer = useRef(null)

  const holdStart = () => {
    timer.current = setTimeout(() => setSecret(true), 700) // segurar ~0.7s
  }
  const holdEnd = () => clearTimeout(timer.current)

  return (
    <section id="closing" className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 py-28 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl font-serif text-4xl italic md:text-6xl"
        style={{ color: 'var(--ink)' }}
      >
        {closing.message}
      </motion.h2>

      {/* coração — segurar para o easter egg */}
      <motion.button
        onMouseDown={holdStart} onMouseUp={holdEnd} onMouseLeave={holdEnd}
        onTouchStart={holdStart} onTouchEnd={holdEnd}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-12"
        style={{ color: 'var(--accent)' }}
        aria-label="Segure para uma surpresa"
      >
        <svg width="56" height="56" viewBox="0 0 48 48" fill="currentColor">
          <path d="M24 42S6 30 6 17.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 18 4.5C42 30 24 42 24 42Z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {secret && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 font-serif text-xl italic"
            style={{ color: 'var(--gold-soft, #e8d4a0)' }}
          >
            {closing.secret}
          </motion.p>
        )}
      </AnimatePresence>

      {/* reviver a animação do hero */}
      <button
        onClick={onReplay}
        className="mt-16 rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] panel"
        style={{ color: 'var(--ink)' }}
      >
        reviver do início
      </button>

      <p className="mt-16 text-xs tracking-[0.25em]" style={{ color: 'var(--ink-soft)' }}>
        {closing.credit}
      </p>
    </section>
  )
}
