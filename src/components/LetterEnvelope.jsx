import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { letter } from '../config'
import { SectionTitle } from './Timeline'

// Envelope 3D em CSS transforms (leve e confiável). A aba abre, a carta sobe.
export default function LetterEnvelope() {
  const [open, setOpen] = useState(false)

  return (
    <section id="letter" className="relative mx-auto max-w-3xl px-6 py-28 md:py-40">
      <SectionTitle sup="para você" title="Uma carta" />

      <div className="mt-16 flex flex-col items-center">
        {/* Envelope */}
        <motion.div
          className="relative"
          style={{ width: 'min(420px, 88vw)', perspective: 1200 }}
        >
          {/* carta que emerge */}
          <AnimatePresence>
            {open && (
              <motion.article
                initial={{ y: 40, opacity: 0, scale: 0.96 }}
                animate={{ y: -30, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative z-0 mx-auto -mb-8 w-[94%] rounded-lg p-8 text-left shadow-2xl"
                style={{
                  background:
                    'repeating-linear-gradient(180deg, #f7f1e3, #f7f1e3 27px, #efe6d2 28px), #f7f1e3',
                  color: '#4a3b28',
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
                }}
              >
                <p className="font-serif text-2xl italic">{letter.greeting}</p>
                {letter.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 font-serif text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
                <p className="mt-6 font-serif italic">{letter.signature}</p>
                <p className="font-serif text-xl">{letter.signName}</p>
              </motion.article>
            )}
          </AnimatePresence>

          {/* corpo do envelope */}
          <div
            className="relative z-10 aspect-[3/2] w-full overflow-hidden rounded-b-lg"
            style={{ background: 'linear-gradient(160deg, var(--plum, #4a2d5e), #2a1b3a)' }}
          >
            {/* dobras diagonais */}
            <div className="absolute inset-0" style={{
              background:
                'linear-gradient(45deg, rgba(0,0,0,0.25) 49.5%, transparent 50%), linear-gradient(-45deg, rgba(0,0,0,0.25) 49.5%, transparent 50%)',
            }} />
            <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(0deg, rgba(255,255,255,0.05), transparent)' }} />
          </div>

          {/* aba superior que abre */}
          <motion.div
            className="absolute left-0 top-0 z-20 w-full origin-top"
            style={{ height: '50%', transformStyle: 'preserve-3d' }}
            animate={{ rotateX: open ? -180 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div
              className="h-full w-full"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(160deg, #5a3a70, #3a2450)',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>

          {/* selo de cera / botão */}
          {!open && (
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-serif text-sm shadow-lg"
              style={{ background: 'var(--accent)', color: '#2a1b3a' }}
              aria-label="Abrir carta"
            >
              abrir
            </motion.button>
          )}
        </motion.div>

        {open && (
          <button
            onClick={() => setOpen(false)}
            className="mt-16 text-xs uppercase tracking-[0.3em]"
            style={{ color: 'var(--ink-soft)' }}
          >
            fechar carta
          </button>
        )}
      </div>
    </section>
  )
}
