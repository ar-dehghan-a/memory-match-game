import {cn, formatTime, toPersian} from '@/lib/utils'
import CountdownTimer from '@/components/CountdownTimer'

export function GameStats({timerRef, movesLeft, timeLimit, bestScore, onTimeEnd, className}) {
  return (
    <div
      className={cn(
        'mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 text-card-foreground sm:mb-6 sm:gap-6 sm:p-4',
        className
      )}
    >
      <div className="min-w-0 text-start">
        <p className="text-xs text-muted-foreground sm:text-sm">حرکات باقیمانده</p>
        <p className="text-2xl font-semibold text-foreground sm:text-3xl">{toPersian(movesLeft)}</p>
      </div>

      <div className="min-w-0 text-start">
        <p className="text-xs text-muted-foreground sm:text-sm">بهترین رکورد</p>
        <p className="text-base font-semibold text-foreground sm:text-lg">
          {bestScore ? `${toPersian(bestScore.movesUsed)} / ${formatTime(bestScore.timeSpent)}` : '—'}
        </p>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <p className="text-xs font-medium text-muted-foreground">زمان</p>
        <CountdownTimer ref={timerRef} initialTime={timeLimit} onFinished={onTimeEnd} />
      </div>
    </div>
  )
}
