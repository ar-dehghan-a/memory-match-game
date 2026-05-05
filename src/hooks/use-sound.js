import {useState, useEffect, useRef, useCallback} from 'react'

/**
 * Custom hook for managing audio playback.
 *
 * @param {string} src
 * @param {Object} [options]
 * @param {boolean} [options.loop]
 * @param {number} [options.volume]
 * @param {boolean} [options.clone]
 *
 * @returns {{play: Function, pause: Function, stop: Function, isPlaying: boolean}}
 */
export const useSound = (src, {loop = false, volume = 1, clone = false} = {}) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // eslint-disable-next-line react-hooks/refs
  if (!audioRef.current) {
    audioRef.current = new Audio(src)
  }

  const play = useCallback(
    (offsetSeconds = 0) => {
      const audio = audioRef.current
      if (clone) {
        const sound = audio.cloneNode()
        if (offsetSeconds > 0) sound.currentTime = offsetSeconds
        sound.play()
      } else {
        if (offsetSeconds > 0) audio.currentTime = offsetSeconds
        audio.play()
      }
    },
    [clone]
  )

  const pause = useCallback(() => audioRef.current.pause(), [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    audio.pause()
    audio.currentTime = 0
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = loop
    audio.volume = volume
  }, [loop, volume])

  useEffect(() => {
    if (clone) return

    const audio = audioRef.current
    const handlePlay = () => setIsPlaying(true)
    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
    }
  }, [clone])

  return {play, pause, stop, isPlaying}
}
