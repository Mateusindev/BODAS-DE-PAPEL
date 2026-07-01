import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// ------------------------------------------------------------
//  Rosa 3D — modelo Sketchfab em /public/models/rose.glb
//  Auto-centraliza + auto-escala (independe do tamanho original).
//  Gira devagar + inclina seguindo o mouse. Rim light dourado no Hero.
// ------------------------------------------------------------

const MODEL = '/models/rose.glb'

// 🎛️ AJUSTES RÁPIDOS DE GOSTO
const TARGET_HEIGHT = 3.6 // tamanho da rosa na cena (aumenta/diminui)
const EXTRA_ROTATION = [0, 0, 0] // se vier deitada/torta: [x, y, z] em radianos
const SPIN_SPEED = 0.18 // velocidade do giro

function Rose() {
  const { scene } = useGLTF(MODEL)
  const outer = useRef() // gira/inclina
  const inner = useRef() // recebe parallax fino

  // clona + centraliza + escala pra caber, uma vez só
  const model = useMemo(() => {
    const root = scene.clone(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    // recentraliza na origem
    root.position.sub(center)

    // escala uniforme pela maior dimensão vertical
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const s = TARGET_HEIGHT / maxDim
    root.scale.setScalar(s)

    // sombras/qualidade
    root.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = o.receiveShadow = true
        if (o.material) o.material.envMapIntensity = 0.6
      }
    })
    return root
  }, [scene])

  useFrame((state, delta) => {
    if (outer.current) outer.current.rotation.y += delta * SPIN_SPEED
    if (inner.current) {
      const p = state.pointer
      inner.current.rotation.z += ((p.x * 0.15) - inner.current.rotation.z) * 0.04
      inner.current.rotation.x += ((p.y * 0.12) - inner.current.rotation.x) * 0.04
    }
  })

  return (
    <group ref={outer}>
      <group ref={inner} rotation={EXTRA_ROTATION}>
        <primitive object={model} />
      </group>
    </group>
  )
}

// Cena com iluminação (rim dourado noturno). Assinatura mantida p/ o Hero.
export default function RoseScene({ mode }) {
  const gold = mode === 'night' ? '#e8d4a0' : '#ffd9a0'
  return (
    <group position={[0, -0.2, 0]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 4]} intensity={45} color="#ffe6d0" distance={22} />
      {/* rim light dourado por trás → contorno brilhante */}
      <pointLight position={[-4, 3, -3]} intensity={60} color={gold} distance={26} />
      <spotLight position={[0, 6, 2]} angle={0.6} penumbra={1} intensity={35} color="#ffffff" />
      <Rose />
    </group>
  )
}

useGLTF.preload(MODEL)
