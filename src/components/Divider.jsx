import { motion } from 'framer-motion'
import { Spark } from './Icons'

// Divisor entre seções: linha que dissolve + faísca dourada + brilho borrado.
// Revela no scroll. Puramente decorativo.
export default function Divider() {
  return (
    <div className="relative flex items-center justify-center py-4 md:py-8" aria-hidden>
      {/* aura borrada atrás */}
      <div
        className="pointer-events-none absolute h-40 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%)', opacity: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative flex items-center gap-4"
      >
        <span className="h-px w-16 md:w-28" style={{ background: 'linear-gradient(to right, transparent, var(--accent))', opacity: 0.6 }} />
        <motion.span
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7], rotate: [0, 45, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--accent)' }}
        >
          <Spark width={20} height={20} />
        </motion.span>
        <span className="h-px w-16 md:w-28" style={{ background: 'linear-gradient(to left, transparent, var(--accent))', opacity: 0.6 }} />
      </motion.div>
    </div>
  )
}
