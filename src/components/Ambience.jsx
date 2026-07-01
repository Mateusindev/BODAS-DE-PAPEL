import { useMemo } from 'react'
import { useTheme } from '../theme'

// Camada de ambiente global (atrás do conteúdo): estrelas, orbs borrados,
// grão de filme e vinheta. Puramente decorativa, pointer-events: none.
export default function Ambience() {
  const { mode } = useTheme()

  // estrelas fixas (geradas 1x)
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 6,
        dur: 3 + Math.random() * 4,
      })),
    [],
  )

  const orbs = [
    { top: '12%', left: '8%', size: 340, color: 'var(--accent)', dur: 26 },
    { top: '55%', left: '78%', size: 420, color: 'var(--accent-2)', dur: 32 },
    { top: '80%', left: '20%', size: 300, color: 'var(--accent)', dur: 22 },
  ]

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* estrelas (só no modo noite) */}
      {mode === 'night' &&
        stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              background: 'var(--gold-soft, #e8d4a0)',
              boxShadow: '0 0 6px rgba(232,212,160,0.6)',
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}

      {/* orbs dourados borrados flutuando */}
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, color-mix(in srgb, ${o.color} 22%, transparent), transparent 70%)`,
            opacity: mode === 'night' ? 0.5 : 0.35,
            animation: `floatOrb ${o.dur}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* vinheta nas bordas */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)' }}
      />

      {/* grão de filme sutil */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
