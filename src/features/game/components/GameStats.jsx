import { cn, formatTime, toPersian } from '@/lib/utils'
import CountdownTimer from '@/components/CountdownTimer'

export function GameStats({ timerRef, movesLeft, timeLimit, bestScore, onTimeEnd, className }) {
  return (
    <div
      className={cn(
        'border-border bg-card text-card-foreground mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 sm:mb-6 sm:gap-6 sm:p-4',
        className
      )}
    >
      <div className="min-w-0 text-start">
        <p className="text-muted-foreground text-xs sm:text-sm">حرکات باقیمانده</p>
        <p className="text-foreground text-2xl font-semibold sm:text-3xl">{toPersian(movesLeft)}</p>
      </div>

      <div className="min-w-0 text-start">
        <p className="text-muted-foreground text-xs sm:text-sm">بهترین رکورد</p>
        <p className="text-foreground text-base font-semibold sm:text-lg">
          {bestScore
            ? `${toPersian(bestScore.movesUsed)} / ${formatTime(bestScore.timeSpent)}`
            : '—'}
        </p>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <p className="text-muted-foreground text-xs font-medium">زمان</p>
        <CountdownTimer ref={timerRef} initialTime={timeLimit} onFinished={onTimeEnd} />
      </div>
    </div>
  )
}
