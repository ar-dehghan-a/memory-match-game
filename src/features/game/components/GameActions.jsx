import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {Play, RotateCcw} from 'lucide-react'

export function GameActions({gameStarted, startGame, resetGame, className}) {
  return (
    <div className={cn('flex justify-center mt-4 pb-2 sm:mt-6 sm:pb-0', className)}>
      {gameStarted ? (
        <Button onClick={resetGame}>
          <RotateCcw /> شروع مجدد
        </Button>
      ) : (
        <Button onClick={startGame}>
          <Play /> شروع بازی
        </Button>
      )}
    </div>
  )
}
