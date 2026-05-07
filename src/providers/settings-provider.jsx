import { useEffect, useContext, createContext } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

const DEFAULT_GAME_SETTINGS = {
  moveLimit: 40,
  timeLimit: 120,
  theme: 'system',
}

const GAME_SETTINGS_STORAGE_KEY = 'memory-game-settings'

const initialState = {
  settings: DEFAULT_GAME_SETTINGS,
  setSettings: () => null,
  theme: 'system',
  setTheme: () => null,
}

const SettingsProviderContext = createContext(initialState)

export const SettingsProvider = ({ children, ...props }) => {
  const [settings, setSettings] = useLocalStorage(GAME_SETTINGS_STORAGE_KEY, DEFAULT_GAME_SETTINGS)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(settings.theme)
  }, [settings.theme])

  const value = {
    settings,
    setSettings,
    theme: settings.theme,
    setTheme: (theme) => setSettings((prev) => ({ ...prev, theme })),
  }

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsProviderContext)

  if (context === undefined) throw new Error('useSettings must be used within a SettingsProvider')

  return context
}
