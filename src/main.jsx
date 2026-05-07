import { setWasmUrl } from '@lottiefiles/dotlottie-react'
setWasmUrl('https://unpkg.com/@lottiefiles/dotlottie-web@0.72.0/dist/dotlottie-player.wasm')

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
