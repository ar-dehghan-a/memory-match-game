import { useState, useEffect } from 'react'
import { shuffle } from '@/lib/utils'

/**
 * Custom hook for managing the memory game state and logic.
 *
 * @param {Object} config
 * @param {Array<{id: string, source: string}>} config.initialCards
 * @param {Object} config.settings
 * @param {number} config.settings.moveLimit
 * @param {number} config.settings.timeLimit
 * @param {Function} [config.onStart]
 * @param {Function} [config.onFlip]
 * @param {Function} [config.onMatch]
 * @param {Function} [config.onFinish]
 *
 * @returns {{state: GameState, actions: GameActions}}
 *
 * @typedef {Object} GameState
 * @property {Array<{id: string, source: string}>} cards
 * @property {Array<string>} flipped
 * @property {Array<string>} matched
 * @property {number} movesLeft
 * @property {'idle'|'preview'|'playing'|'finished'} status
 * @property {('win'|'gameover'|null)} result
 *
 * @typedef {Object} GameActions
 * @property {Function} flipCard
 * @property {Function} startGame
 * @property {Function} resetGame
 * @property {Function} endGame
 */
export const useMemoryGame = ({ initialCards, settings, onStart, onFlip, onMatch, onFinish }) => {
  const [cards, setCards] = useState(shuffle(initialCards))
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [movesLeft, setMovesLeft] = useState(settings.moveLimit)
  const [status, setStatus] = useState('idle') // idle | preview | playing | finished
  const [result, setResult] = useState(null) // 'win', 'gameover', or null

  const startGame = () => {
    setStatus('preview')
    setFlipped(cards)
    setTimeout(() => {
      setFlipped([])
      setStatus('playing')
      onStart?.()
    }, 4000)
  }

  const resetGame = () => {
    setFlipped([])
    setMatched([])
    setTimeout(() => setCards(shuffle(initialCards)), 600)
    setMovesLeft(settings.moveLimit)
    setStatus('idle')
    setResult(null)
  }

  const checkMatch = (a, b, nextMoves) => {
    if (a.source === b.source) {
      const newMatched = [...matched, a.id, b.id]
      setMatched(newMatched)
      onMatch?.()

      if (newMatched.length === cards.length) {
        setStatus('finished')
        setResult('win')
        onFinish?.()
        return
      }

      if (nextMoves === 0) {
        setStatus('finished')
        setResult('gameover')
        onFinish?.()
      } else setFlipped([])
    } else
      setTimeout(() => {
        if (nextMoves === 0) {
          setStatus('finished')
          setResult('gameover')
          onFinish?.()
        } else setFlipped([])
      }, 1000)
  }

  const flipCard = (card) => {
    if (status === 'idle') return startGame()
    if (status !== 'playing') return
    if (flipped.some((c) => c.id === card.id)) return
    if (flipped.length === 2) return
    if (matched.includes(card.id)) return

    const newFlipped = [...flipped, card]
    setFlipped(newFlipped)
    onFlip?.()

    const nextMoves = Math.max(movesLeft - 1, 0)
    setMovesLeft(nextMoves)

    if (nextMoves === 0) {
      setStatus('finished')
      setResult('gameover')
      onFinish?.()
    }

    if (newFlipped.length === 2) {
      checkMatch(newFlipped[0], newFlipped[1], nextMoves)
    }
  }

  const endGame = (isWin = false) => {
    setStatus('finished')
    setResult(isWin ? 'win' : 'gameover')
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (status === 'idle') setMovesLeft(settings.moveLimit)
  }, [settings.moveLimit, status])

  return {
    state: { cards, flipped, matched, movesLeft, status, result },
    actions: { flipCard, startGame, resetGame, endGame },
  }
}
