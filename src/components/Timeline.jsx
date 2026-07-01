import { motion } from 'framer-motion'
import { timeline } from '../config'
import { icons } from './Icons'

// Linha do tempo em curva serpenteante — marcos alternam esquerda/direita.
function Milestone({ item, i }) {
  const Icon = icons[item.icon] || icons.heart
  const left = i % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ perspective: 800 }}
      className={`relative flex w-full items-center gap-6 ${left ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* card */}
      <div className={`panel flex-1 rounded-2xl p-6 md:p-8 ${left ? 'md:text-right' : 'md:text-left'} text-left`}>
        <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>
          {item.date}
        </span>
        <h3 className="mt-2 font-serif text-2xl md:text-3xl" style={{ color: 'var(--ink)' }}>
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          {item.text}
        </p>
      </div>

      {/* nó central com ícone */}
      <div className="relative z-10 flex shrink-0 items-center justify-center">
        <motion.span
          whileInView={{ scale: [0.6, 1.15, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex h-16 w-16 items-center justify-center rounded-full panel"
          style={{ color: 'var(--accent)' }}
        >
          <Icon width={30} height={30} />
        </motion.span>
      </div>

      {/* espaçador do outro lado (desktop) */}
      <div className="hidden flex-1 md:block" />
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative mx-auto max-w-4xl px-6 py-28 md:py-40">
      <SectionTitle sup="nossa história" title="Como chegamos até aqui" />

      <div className="relative mt-20 flex flex-col gap-16 md:gap-24">
        {/* trilha vertical central */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)', opacity: 0.4 }}
        />
        {timeline.map((item, i) => (
          <Milestone key={i} item={item} i={i} />
        ))}
      </div>
    </section>
  )
}

export function SectionTitle({ sup, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <p className="text-xs uppercase tracking-[0.5em]" style={{ color: 'var(--accent)' }}>
        {sup}
      </p>
      <h2 className="mt-3 font-serif text-4xl md:text-5xl" style={{ color: 'var(--ink)' }}>
        {title}
      </h2>
    </motion.div>
  )
}
