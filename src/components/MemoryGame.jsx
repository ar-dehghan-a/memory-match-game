import {useRef, useEffect, useState} from 'react'
import {isBetterScore} from '@/lib/utils'
import {useSettings} from '@/providers/settings-provider'
import {useSound} from '@/hooks/use-sound'
import {useLocalStorage} from '@/hooks/use-local-storage'
import Layout from './layout/Layout'
import Header from './Header'
import {GameActions, GameBoard, GameStats, GameFinishedDialog, useMemoryGame} from '@/features/game'

import Img1 from '../assets/images/product-1.jpg'
import Img2 from '../assets/images/product-2.jpg'
import Img3 from '../assets/images/product-3.jpg'
import Img4 from '../assets/images/product-4.jpg'
import Img5 from '../assets/images/product-5.jpg'
import Img6 from '../assets/images/product-6.jpg'
import Img7 from '../assets/images/product-7.jpg'
import Img8 from '../assets/images/product-8.jpg'
import flipSound from '../assets/sounds/flip.mp3'
import coinSound from '../assets/sounds/coin.mp3'

const initialCards = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8]
const BEST_SCORE_KEY = 'memory-best-score'

function MemoryGame() {
  const {settings} = useSettings()

  const timerRef = useRef(null)

  const flipEffect = useSound(flipSound, {clone: true})
  const coinEffect = useSound(coinSound, {clone: true})

  const game = useMemoryGame({
    initialCards,
    settings,
    onStart: () => timerRef.current?.start(),
    onFlip: flipEffect.play,
    onMatch: () => setTimeout(coinEffect.play, 600),
    onFinish: () => timerRef.current?.stop(),
  })
  const {cards, flipped, matched, movesLeft, status, result} = game.state
  const {flipCard, startGame, resetGame, endGame} = game.actions

  const [bestScore, setBestScore] = useLocalStorage(BEST_SCORE_KEY, null)
  const [currentScore, setCurrentScore] = useState(null)

  const updateBestScore = () => {
    if (result === 'win') {
      const timeLeft = timerRef.current?.time ?? 0
      const currentRun = {
        movesUsed: Math.max(settings.moveLimit - movesLeft, 0),
        timeSpent: Math.max(settings.timeLimit - timeLeft, 0),
      }
      setCurrentScore(currentRun)
      setBestScore(prev => (isBetterScore(currentRun, prev) ? currentRun : prev))
    } else {
      setCurrentScore(null)
    }
  }

  const handleResetGame = () => {
    resetGame()
    timerRef.current?.reset()
  }

  useEffect(() => {
    if (result) updateBestScore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <Layout>
      <Layout.Header className="flex items-center justify-between gap-2">
        <Header gameStarted={status === 'playing' || status === 'preview'} />
      </Layout.Header>

      <Layout.Content className="flex flex-col max-sm:justify-between">
        <GameStats
          timerRef={timerRef}
          movesLeft={movesLeft}
          timeLimit={settings.timeLimit}
          bestScore={bestScore}
          onTimeEnd={endGame}
        />

        <GameBoard
          cards={cards}
          flippedIds={flipped.map(s => s.id)}
          matchedIds={matched}
          onCardClick={flipCard}
        />

        <GameActions gameStatus={status} startGame={startGame} resetGame={handleResetGame} />
      </Layout.Content>

      <GameFinishedDialog
        result={result}
        onRestart={handleResetGame}
        bestScore={bestScore}
        currentScore={currentScore}
      />
    </Layout>
  )
}

export default MemoryGame
