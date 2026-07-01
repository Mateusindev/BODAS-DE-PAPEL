import { motion } from 'framer-motion'

// Loading temático: par de alianças pulsando (não spinner genérico).
export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg-bottom)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.svg
          width="72" height="72" viewBox="0 0 48 48"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--accent)' }}
        >
          <g fill="none" stroke="currentColor" strokeWidth={1.3}>
            <circle cx="18" cy="26" r="11" />
            <circle cx="30" cy="26" r="11" />
          </g>
        </motion.svg>
        <motion.span
          className="font-serif text-sm tracking-[0.35em] uppercase"
          style={{ color: 'var(--ink-soft)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          carregando nossa história
        </motion.span>
      </motion.div>
    </div>
  )
}
