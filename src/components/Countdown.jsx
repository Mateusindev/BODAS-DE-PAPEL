import { useEffect, useState } from 'react'
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

const pad = (n) => String(n).padStart(2, '0')
const units = (t) => [
  { v: t.days, l: 'dias', frac: (t.days % 365) / 365 },
  { v: t.hours, l: 'horas', frac: t.hours / 24 },
  { v: t.minutes, l: 'min', frac: t.minutes / 60 },
  { v: t.seconds, l: 'seg', frac: t.seconds / 60 },
]

// anel de progresso por unidade
function Ring({ value, label, frac }) {
  const r = 46, c = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28 md:h-32 md:w-32">
        <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
          <circle cx="55" cy="55" r={r} fill="none" stroke="var(--panel-border)" strokeWidth="3" />
          <circle
            cx="55" cy="55" r={r} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - frac)}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl md:text-4xl" style={{ color: 'var(--ink)' }}>
          {pad(value)}
        </div>
      </div>
      <span className="mt-2 text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--ink-soft)' }}>{label}</span>
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
      <div className="mt-14 flex flex-wrap items-center justify-center gap-5 md:gap-8">
        {units(t).map((u) => (
          <Ring key={u.l} value={u.v} label={u.l} frac={u.frac} />
        ))}
      </div>
    </section>
  )
}
