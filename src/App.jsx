import { SettingsProvider } from './providers/settings-provider'
import { MemoryGame } from './features/game'

function App() {
  return (
    <SettingsProvider>
      <MemoryGame />
    </SettingsProvider>
  )
}

export default App
