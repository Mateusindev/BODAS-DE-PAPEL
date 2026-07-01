import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { music } from '../config'

// Player discreto: vinil giratório fixo no canto. Play/pause estilizado.
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(true)

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    try {
      if (playing) {
        a.pause()
        setPlaying(false)
      } else {
        await a.play()
        setPlaying(true)
      }
    } catch {
      // arquivo ausente / autoplay bloqueado — desativa graciosamente
      setReady(false)
    }
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onErr = () => setReady(false)
    a.addEventListener('error', onErr)
    return () => a.removeEventListener('error', onErr)
  }, [])

  // Autoplay: tenta tocar no load. Browsers bloqueiam áudio com som até
  // interação → fallback inicia no 1º clique/scroll/toque/tecla em qualquer lugar.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    let started = false

    const start = async () => {
      if (started) return
      try {
        await a.play()
        started = true
        setPlaying(true)
        cleanup()
      } catch {
        /* ainda bloqueado — espera próxima interação */
      }
    }

    const cleanup = () => {
      ;['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach((ev) =>
        window.removeEventListener(ev, start),
      )
    }

    start() // tentativa imediata (funciona se o browser permitir)
    ;['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach((ev) =>
      window.addEventListener(ev, start, { once: false, passive: true }),
    )

    return cleanup
  }, [])

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      <audio ref={audioRef} src={music.src} loop preload="auto" />

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{ background: 'radial-gradient(circle at 50%, #2a2a3e 0 30%, #16162a 31% 100%)', border: '1px solid var(--panel-border)' }}
        aria-label={playing ? 'Pausar música' : 'Tocar música'}
      >
        {/* vinil girando */}
        <motion.span
          animate={{ rotate: playing ? 360 : 0 }}
          transition={playing ? { repeat: Infinity, duration: 4, ease: 'linear' } : { duration: 0.4 }}
          className="absolute inset-1 rounded-full"
          style={{ background: 'repeating-radial-gradient(circle at 50%, #1a1a2e 0 2px, #222240 2px 3px)' }}
        />
        <span className="relative h-3 w-3 rounded-full" style={{ background: 'var(--accent)' }} />
        {/* ícone play/pause sobre o centro */}
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]" style={{ background: 'var(--accent)', color: '#16162a' }}>
          {playing ? '❚❚' : '▶'}
        </span>
      </motion.button>

      <div className="hidden flex-col leading-tight sm:flex">
        <span className="font-serif text-sm" style={{ color: 'var(--ink)' }}>{music.title}</span>
        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
          {ready ? music.artist : 'adicione o arquivo em /public/music/'}
        </span>
      </div>
    </div>
  )
}
