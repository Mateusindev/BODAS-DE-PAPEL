import { motion } from 'framer-motion'
import { useTheme } from '../theme'

// Toggle dia/noite: transforma paleta + cor das partículas ("em todas as fases").
export default function ThemeToggle() {
  const { mode, toggle } = useTheme()
  const night = mode === 'night'

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full panel"
      style={{ color: 'var(--accent)' }}
      aria-label={night ? 'Mudar para dia' : 'Mudar para noite'}
    >
      <motion.span key={mode} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        {night ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10Z" strokeLinejoin="round" />
          </svg>
        )}
      </motion.span>
    </motion.button>
  )
}
