// Ícones SVG custom p/ a linha do tempo (nada de emoji genérico).
// Traço fino dourado, estilo "gravado".
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Spark = (p) => (
  <svg viewBox="0 0 48 48" {...p}>
    <g {...base}>
      <path d="M24 6v10M24 32v10M6 24h10M32 24h10" />
      <path d="M24 16c0 4 4 8 8 8-4 0-8 4-8 8 0-4-4-8-8-8 4 0 8-4 8-8Z" />
    </g>
  </svg>
)

export const Heart = (p) => (
  <svg viewBox="0 0 48 48" {...p}>
    <path {...base} d="M24 40S8 30 8 18.5A8.5 8.5 0 0 1 24 14a8.5 8.5 0 0 1 16 4.5C40 30 24 40 24 40Z" />
  </svg>
)

export const Ring = (p) => (
  <svg viewBox="0 0 48 48" {...p}>
    <g {...base}>
      <circle cx="24" cy="28" r="12" />
      <path d="M18 16l6-8 6 8M20 12h8" />
    </g>
  </svg>
)

export const Rings = (p) => (
  <svg viewBox="0 0 48 48" {...p}>
    <g {...base}>
      <circle cx="18" cy="28" r="11" />
      <circle cx="30" cy="28" r="11" />
    </g>
  </svg>
)

export const Moon = (p) => (
  <svg viewBox="0 0 48 48" {...p}>
    <g {...base}>
      <path d="M30 8a16 16 0 1 0 10 28A13 13 0 0 1 30 8Z" />
      <path d="M14 12l1.5 3 3 1.5-3 1.5L14 21l-1.5-3-3-1.5 3-1.5Z" />
    </g>
  </svg>
)

export const icons = { spark: Spark, heart: Heart, ring: Ring, rings: Rings, moon: Moon }
