import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { letter } from '../config'
import { SectionTitle } from './Timeline'

const MODEL = '/models/letter.glb'

// 🎛️ AJUSTES RÁPIDOS
const TARGET_SIZE = 3.2 // tamanho do modelo
// orientação base do modelo (aplicada num group interno, não é sobrescrita pela animação).
// veio de lado -> gira em Y pra ficar de frente. Troca o sinal se ficar de costas.
const EXTRA_ROTATION = [0, -Math.PI / 2, 0]

// ---- modelo 3D da carta (auto-centraliza/escala) — animação PULSAR ----
function LetterModel({ open }) {
  const { scene } = useGLTF(MODEL)
  const group = useRef()

  const model = useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    root.position.sub(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    root.scale.setScalar(TARGET_SIZE / maxDim)
    root.traverse((o) => {
      if (o.isMesh && o.material) o.material.envMapIntensity = 0.6
    })
    return root
  }, [scene])

  const t = useRef(0)
  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    t.current += delta
    const time = t.current
    const bob = Math.sin(time * 0.8) * 0.12
    const p = state.pointer

    // PULSAR: batida leve idle; "pop" (scale) + ergue ao abrir
    const T = { posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 }
    T.scale = open ? 0.72 : 1 + Math.sin(time * 2) * 0.04
    T.posY = open ? 0.5 : bob * 0.5
    T.rotX = open ? -0.4 : 0

    // parallax de mouse quando fechado
    if (!open) {
      T.rotY += p.x * 0.25
      T.rotX += -p.y * 0.12
    }

    const k = 0.06
    g.position.y += (T.posY - g.position.y) * k
    g.position.z += (T.posZ - g.position.z) * k
    g.rotation.x += (T.rotX - g.rotation.x) * k
    g.rotation.y += (T.rotY - g.rotation.y) * k
    g.rotation.z += (T.rotZ - g.rotation.z) * k
    g.scale.x += (T.scale - g.scale.x) * k
    g.scale.y += (T.scale - g.scale.y) * k
    g.scale.z += (T.scale - g.scale.z) * k
  })

  return (
    <group ref={group}>
      {/* offset de orientação — separado da animação */}
      <group rotation={EXTRA_ROTATION}>
        <primitive object={model} />
      </group>
    </group>
  )
}

// variantes de stagger p/ o texto da carta
const cardV = {
  hidden: { opacity: 0, scaleY: 0.35, y: 30 },
  show: {
    opacity: 1, scaleY: 1, y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], staggerChildren: 0.12, delayChildren: 0.25 },
  },
  exit: { opacity: 0, scaleY: 0.35, y: 30, transition: { duration: 0.4 } },
}
const lineV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function LetterEnvelope() {
  const [open, setOpen] = useState(false)

  return (
    <section id="letter" className="relative mx-auto max-w-3xl px-6 py-28 md:py-40">
      <SectionTitle sup="para você" title="Uma carta" />

      <div className="relative mt-14 flex flex-col items-center">
        {/* palco 3D */}
        <div className="relative h-[420px] w-full">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.8]}>
            <ambientLight intensity={0.7} />
            <pointLight position={[3, 4, 5]} intensity={45} color="#ffe6d0" distance={20} />
            <pointLight position={[-4, 2, -2]} intensity={40} color="#e8d4a0" distance={22} />
            <spotLight position={[0, 6, 3]} angle={0.6} penumbra={1} intensity={30} />
            <Suspense fallback={null}>
              <LetterModel open={open} />
            </Suspense>
          </Canvas>

          {/* clique no palco para abrir/fechar */}
          {!open && (
            <button
              onClick={() => setOpen(true)}
              className="absolute inset-0 flex items-end justify-center pb-6"
              aria-label="Abrir carta"
            >
              <motion.span
                animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em] panel"
                style={{ color: 'var(--ink)' }}
              >
                toque para abrir
              </motion.span>
            </button>
          )}
        </div>

        {/* carta escrita — desdobra por cima do modelo */}
        <AnimatePresence>
          {open && (
            <motion.article
              variants={cardV}
              initial="hidden"
              animate="show"
              exit="exit"
              style={{ transformOrigin: 'top center', background: 'repeating-linear-gradient(180deg, #f7f1e3, #f7f1e3 27px, #efe6d2 28px), #f7f1e3', color: '#4a3b28' }}
              className="relative z-10 -mt-24 w-[94%] max-w-xl rounded-lg p-8 text-left shadow-2xl md:p-10"
            >
              <motion.p variants={lineV} className="font-serif text-2xl italic">{letter.greeting}</motion.p>
              {letter.paragraphs.map((p, i) => (
                <motion.p key={i} variants={lineV} className="mt-4 font-serif text-lg leading-relaxed">
                  {p}
                </motion.p>
              ))}
              <motion.p variants={lineV} className="mt-6 font-serif italic">{letter.signature}</motion.p>
              <motion.p variants={lineV} className="font-serif text-xl">{letter.signName}</motion.p>
            </motion.article>
          )}
        </AnimatePresence>

        {open && (
          <button
            onClick={() => setOpen(false)}
            className="mt-10 text-xs uppercase tracking-[0.3em]"
            style={{ color: 'var(--ink-soft)' }}
          >
            fechar carta
          </button>
        )}
      </div>
    </section>
  )
}

useGLTF.preload(MODEL)
