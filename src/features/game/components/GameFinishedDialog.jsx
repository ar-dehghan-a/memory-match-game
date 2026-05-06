import {DotLottieReact} from '@lottiefiles/dotlottie-react'
import {cn, formatTime, toPersian} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {RotateCcw} from 'lucide-react'

import confettiAnimation from '@/assets/animations/confetti.json'

export function GameFinishedDialog({result, onRestart, bestScore, currentScore}) {
  const isWin = result === 'win'
  const isGameOver = result === 'gameover'
  const open = !!result

  return (
    <>
      {result === 'win' && (
        <DotLottieReact className="fixed inset-0 z-500" data={confettiAnimation} loop autoplay />
      )}

      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={e => e.preventDefault()}
          onEscapeKeyDown={e => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle
              className={cn(
                'text-center text-2xl',
                isWin && 'text-primary',
                isGameOver && 'text-destructive'
              )}
            >
              {isWin ? 'بردی!' : isGameOver ? 'باختی!' : ''}
            </DialogTitle>

            <DialogDescription className="text-center">
              {isWin
                ? 'عالی بود! تمام جفت‌ها را پیدا کردی.'
                : isGameOver
                  ? 'متاسفانه عملکردتان خوب نبود تمرکز کنید و دوباره تلاش کنید!'
                  : ''}
            </DialogDescription>

            {isWin && currentScore && (
              <div className="mt-3 space-y-1 text-center text-sm text-muted-foreground">
                <p>
                  عملکرد این دست:{' '}
                  <span className="font-medium text-foreground">{toPersian(currentScore.movesUsed)}</span>{' '}
                  حرکت، در زمان{' '}
                  <span className="font-medium text-foreground">{formatTime(currentScore.timeSpent)}</span>
                </p>

                {bestScore && (
                  <p>
                    بهترین رکورد:{' '}
                    <span className="font-medium text-foreground">{toPersian(bestScore.movesUsed)}</span>{' '}
                    حرکت، در زمان{' '}
                    <span className="font-medium text-foreground">{formatTime(bestScore.timeSpent)}</span>
                  </p>
                )}
              </div>
            )}
          </DialogHeader>

          <DialogFooter className="sm:justify-center">
            <Button type="button" onClick={onRestart} size="lg" className="min-w-32">
              <RotateCcw /> شروع دوباره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
