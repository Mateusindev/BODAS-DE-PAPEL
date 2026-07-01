import { createContext, useContext, useEffect, useState } from 'react'

// Modo dia/noite — controla a paleta (via data-mode) e as cenas 3D.
const ThemeCtx = createContext({ mode: 'night', toggle: () => {} })

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('night')

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  const toggle = () => setMode((m) => (m === 'night' ? 'day' : 'night'))

  return <ThemeCtx.Provider value={{ mode, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
