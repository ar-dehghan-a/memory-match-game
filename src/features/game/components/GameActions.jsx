import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Play, RotateCcw } from 'lucide-react'

export function GameActions({ gameStatus, startGame, resetGame, className }) {
  return (
    <div className={cn('mt-4 flex justify-center pb-2 sm:mt-6 sm:pb-0', className)}>
      {gameStatus === 'playing' ? (
        <Button onClick={resetGame}>
          <RotateCcw /> شروع دوباره
        </Button>
      ) : (
        <Button onClick={startGame} disabled={gameStatus === 'preview'}>
          <Play /> شروع بازی
        </Button>
      )}
    </div>
  )
}
