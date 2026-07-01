import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery } from '../config'
import { SectionTitle } from './Timeline'

// filtro coeso "álbum" aplicado em todas as fotos
const FILTER = 'saturate(0.85) sepia(0.12) contrast(1.03)'

// giro determinístico -4..+4 graus (scrapbook)
const rot = (i) => -4 + ((i * 37) % 9)

// ------- POLAROIDS (scrapbook) -------
function Polaroid({ item, index, onOpen }) {
  return (
    <motion.button
      layoutId={`photo-${index}`}
      onClick={() => onOpen(index)}
      initial={{ rotate: rot(index) }}
      whileInView={{ rotate: rot(index) }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="group relative w-[46%] max-w-[260px] rounded-sm bg-[#f7f1e3] p-3 pb-10 shadow-xl sm:w-[240px]"
      style={{ transformOrigin: 'center', boxShadow: '0 18px 40px -14px rgba(0,0,0,0.6)' }}
    >
      <div className="aspect-square w-full overflow-hidden bg-black/10">
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ filter: FILTER }}
        />
      </div>
      <span className="absolute bottom-2.5 left-0 w-full px-2 text-center font-serif text-sm italic text-[#4a3b28]">
        {item.caption}
      </span>
    </motion.button>
  )
}

// ------- Lightbox (swipe / setas / ESC) -------
function Lightbox({ index, onClose, onNav }) {
  const item = gallery[index]
  const touch = useRef(null)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNav])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,5,16,0.88)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1)
        touch.current = null
      }}
    >
      <motion.figure
        layoutId={`photo-${index}`}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl"
      >
        <img src={item.src} alt={item.caption} className="max-h-[85vh] w-full object-contain" />
        <figcaption className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-center font-serif text-xl text-white">
          {item.caption}
        </figcaption>
      </motion.figure>
      <button onClick={(e) => { e.stopPropagation(); onNav(-1) }} className="absolute left-4 text-3xl text-white/70 hover:text-white md:left-10">‹</button>
      <button onClick={(e) => { e.stopPropagation(); onNav(1) }} className="absolute right-4 text-3xl text-white/70 hover:text-white md:right-10">›</button>
      <button onClick={onClose} className="absolute right-5 top-5 text-xl text-white/70 hover:text-white">✕</button>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const nav = useCallback((dir) => setOpen((i) => (i + dir + gallery.length) % gallery.length), [])

  return (
    <section id="gallery" className="mx-auto max-w-5xl px-6 py-28 md:py-40">
      <SectionTitle sup="momentos" title="Nossa galeria viva" />

      <div className="mt-16 flex flex-wrap items-center justify-center gap-5 sm:gap-7">
        {gallery.map((item, i) => (
          <Polaroid key={i} item={item} index={i} onOpen={setOpen} />
        ))}
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onNav={nav} />}
      </AnimatePresence>
    </section>
  )
}
