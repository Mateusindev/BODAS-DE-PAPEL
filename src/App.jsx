import { Suspense, useState } from 'react'
import { ThemeProvider } from './theme'
import { useLenis } from './useLenis'
import Loader from './components/Loader'
import Hero3D from './components/Hero3D'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import LetterEnvelope from './components/LetterEnvelope'
import Countdown from './components/Countdown'
import MusicPlayer from './components/MusicPlayer'
import ThemeToggle from './components/ThemeToggle'
import Closing from './components/Closing'

export default function App() {
  useLenis()
  // key força remontar o Hero p/ "reviver" a animação inicial
  const [heroKey, setHeroKey] = useState(0)

  const replay = () => {
    setHeroKey((k) => k + 1)
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <ThemeToggle />
        <MusicPlayer />

        <main>
          <Hero3D key={heroKey} />
          <Timeline />
          <Gallery />
          <LetterEnvelope />
          <Countdown />
          {/* Seção 6 (constelação 3D) e trilha completa entram na próxima etapa */}
          <Closing onReplay={replay} />
        </main>
      </Suspense>
    </ThemeProvider>
  )
}
