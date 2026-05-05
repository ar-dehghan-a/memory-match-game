import {useState, useEffect, useCallback} from 'react'

/**
 * Custom hook for managing localStorage with React state.
 *
 * @param {string} key
 * @param {*} initialValue
 *
 * @returns {[*, Function, Function]}
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: Error reading key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    value => {
      try {
        setStoredValue(prev => {
          const newValue = value instanceof Function ? value(prev) : value
          localStorage.setItem(key, JSON.stringify(newValue))
          return newValue
        })
      } catch (error) {
        console.warn(`useLocalStorage: Error setting key "${key}":`, error)
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`useLocalStorage: Error removing key "${key}":`, error)
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleStorageChange = event => {
      if (event.key !== key || event.storageArea !== localStorage) return

      try {
        const newValue = event.newValue !== null ? JSON.parse(event.newValue) : initialValue
        setStoredValue(newValue)
      } catch (error) {
        console.warn(`useLocalStorage: Error syncing key "${key}":`, error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return [storedValue, setValue, removeValue]
}
