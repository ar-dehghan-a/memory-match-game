import { useRef, useState, useCallback, useEffect } from 'react'

/**
 * Custom hook for managing a countdown timer.
 *
 * @param {Object} config
 * @param {number} config.initialTime
 * @param {Function} [config.onFinished]
 *
 * @returns {{time: number, status: string, start: Function, stop: Function, reset: Function}}
 */
export const useCountdown = ({ initialTime, onFinished }) => {
  const [time, setTime] = useState(initialTime)
  const [status, setStatus] = useState('idle') // idle | running | paused | done

  const intervalRef = useRef(null)

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const start = useCallback(() => {
    if (status === 'running') return

    setStatus('running')

    intervalRef.current = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0))
    }, 1000)
  }, [status])

  const stop = useCallback(() => {
    clear()
    setStatus('paused')
  }, [])

  const reset = useCallback(() => {
    clear()
    setTime(initialTime)
    setStatus('idle')
  }, [initialTime])

  useEffect(() => {
    if (time === 0 && status === 'running') {
      clear()
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('done')
      onFinished?.()
    }
  }, [time, status, onFinished])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (status === 'idle') setTime(initialTime)
  }, [status, initialTime])

  useEffect(() => clear, [])

  return {
    time,
    status,
    start,
    stop,
    reset,
  }
}
