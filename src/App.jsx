import { SettingsProvider } from './providers/settings-provider'
import MemoryGame from './components/MemoryGame'

function App() {
  return (
    <SettingsProvider>
      <MemoryGame />
    </SettingsProvider>
  )
}

export default App
