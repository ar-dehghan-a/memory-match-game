import { forwardRef, useImperativeHandle } from 'react'
import { useCountdown } from '@/hooks/use-countdown'
import { pad, toPersian } from '@/lib/utils'

const CIRC = 2 * Math.PI * 40

const CountdownTimer = forwardRef(({ initialTime, onFinished }, ref) => {
  const timer = useCountdown({ initialTime, onFinished })
  const { time } = timer

  useImperativeHandle(ref, () => timer)

  const pct = time / initialTime
  const offset = CIRC * (1 - pct)

  const m = Math.floor(time / 60)
  const s = time % 60

  return (
    <div className="relative flex size-20 items-center justify-center sm:size-25">
      <svg className="size-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-border"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          className="text-primary"
          style={{ transition: 'stroke-dashoffset 1s linear, color 0.4s linear' }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center gap-0.5" dir="ltr">
        <span className="text-foreground text-base leading-none font-medium sm:text-xl">
          {toPersian(pad(m))}:{toPersian(pad(s))}
        </span>
      </div>
    </div>
  )
})

export default CountdownTimer
