import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export const cn = (...inputs) => twMerge(clsx(inputs))

export const shuffle = (array, limit) => {
  const newArray = array.slice(0, limit || array.length)

  return [...newArray]
    .concat(newArray)
    .map((item, index) => ({id: index, source: item}))
    .sort(() => Math.random() - 0.5)
}

export const pad = n => {
  return String(n).padStart(2, '0')
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const toPersian = input => String(input).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

export const toEnglish = input =>
  String(input)
    .replace(/[۰-۹]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
    .replace(/\D/g, '')

export const formatTime = seconds => {
  const value = Math.max(0, Number(seconds || 0))
  const m = Math.floor(value / 60)
  const s = value % 60
  return `${toPersian(pad(m))}:${toPersian(pad(s))}`
}

export const isBetterScore = (candidate, currentBest) => {
  if (!currentBest) return true
  if (candidate.movesUsed < currentBest.movesUsed) return true
  if (candidate.movesUsed > currentBest.movesUsed) return false
  return candidate.timeSpent < currentBest.timeSpent
}
