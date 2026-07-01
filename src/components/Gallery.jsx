import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery } from '../config'
import { SectionTitle } from './Timeline'

// span do mosaico -> classes de grid
const spanClass = {
  big: 'sm:col-span-2 sm:row-span-2',
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
}

// Foto individual com tilt 3D no hover + legenda que surge.
function Photo({ item, index, onOpen }) {
  const ref = useRef()
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setStyle({ transform: `perspective(700px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.03)` })
  }
  const reset = () => setStyle({ transform: 'perspective(700px) rotateY(0) rotateX(0) scale(1)' })

  return (
    <motion.button
      layoutId={`photo-${index}`}
      onClick={() => onOpen(index)}
      onMouseMove={onMove}
      onMouseLeave={reset}
      ref={ref}
      style={style}
      className={`group relative overflow-hidden rounded-xl transition-transform duration-200 ease-out ${spanClass[item.span] || ''}`}
    >
      <img
        src={item.src}
        alt={item.caption}
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ filter: 'saturate(0.85) sepia(0.12) contrast(1.03)' }} /* filtro coeso "álbum" */
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-4 translate-y-2 font-serif text-lg text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {item.caption}
      </span>
    </motion.button>
  )
}

// Lightbox com transição fluida (layoutId) + navegação setas/swipe.
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

      {/* controles */}
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
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionTitle sup="momentos" title="Nossa galeria viva" />

      <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
        {gallery.map((item, i) => (
          <Photo key={i} item={item} index={i} onOpen={setOpen} />
        ))}
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onNav={nav} />}
      </AnimatePresence>
    </section>
  )
}
