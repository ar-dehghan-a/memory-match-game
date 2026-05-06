import {useState} from 'react'
import {useSettings} from '@/providers/settings-provider'
import {clamp, toEnglish, toPersian} from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {MAX_MOVE_LIMIT, MAX_TIME_LIMIT, MIN_MOVE_LIMIT, MIN_TIME_LIMIT} from '../constants'
import {Settings, Monitor, Moon, Sun} from 'lucide-react'

const themes = [
  {id: 'light', label: 'روشن', Icon: Sun},
  {id: 'dark', label: 'تاریک', Icon: Moon},
  {id: 'system', label: 'سیستم', Icon: Monitor},
]

const parseNumber = value => {
  const digits = toEnglish(value)
  const n = parseInt(digits)
  return Number.isNaN(n) ? 0 : n
}

export function GameSettingsDialog({gameStarted}) {
  const {theme, setTheme, settings, setSettings} = useSettings()

  const [draft, setDraft] = useState({
    moveLimit: settings.moveLimit,
    timeLimit: settings.timeLimit,
  })

  const handleMoveInput = e => setDraft(prev => ({...prev, moveLimit: parseNumber(e.target.value)}))
  const handleTimeInput = e => setDraft(prev => ({...prev, timeLimit: parseNumber(e.target.value)}))

  const handleMoveBlur = () => {
    const moveLimit = clamp(draft.moveLimit, MIN_MOVE_LIMIT, MAX_MOVE_LIMIT)
    setDraft(prev => ({...prev, moveLimit: moveLimit}))
    setSettings(prev => ({...prev, moveLimit: moveLimit}))
  }

  const handleTimeBlur = () => {
    const timeLimit = clamp(draft.timeLimit, MIN_TIME_LIMIT, MAX_TIME_LIMIT)
    setDraft(prev => ({...prev, timeLimit: timeLimit}))
    setSettings(prev => ({...prev, timeLimit: timeLimit}))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>تنظیمات</DialogTitle>
          <DialogDescription>ظاهر و قوانین بازی را شخصی‌سازی کنید.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">پوسته</p>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(({id, label, Icon}) => {
                const active = theme === id
                return (
                  <Button
                    key={id}
                    type="button"
                    variant={active ? 'default' : 'outline'}
                    className="flex h-auto flex-col gap-1 py-3"
                    aria-pressed={active}
                    onClick={() => setTheme(id)}
                  >
                    <Icon className="size-4" />
                    <span className="text-xs font-medium">{label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">قوانین بازی</p>
            {gameStarted && (
              <p className="text-xs text-muted-foreground">
                برای تغییر تعداد حرکت یا زمان، بازی را تمام کنید یا شروع دوباره بزنید.
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 text-start">
                <label htmlFor="settings-move-limit" className="text-sm font-medium">
                  تعداد حرکت
                </label>
                <Input
                  id="settings-move-limit"
                  type="text"
                  value={toPersian(draft.moveLimit)}
                  disabled={gameStarted}
                  onChange={handleMoveInput}
                  onBlur={handleMoveBlur}
                />
                <p className="text-xs text-muted-foreground">
                  حداقل {toPersian(MIN_MOVE_LIMIT)} حداکثر {toPersian(MAX_MOVE_LIMIT)} حرکت
                </p>
              </div>

              <div className="space-y-1.5 text-start">
                <label htmlFor="settings-time-limit" className="text-sm font-medium">
                  زمان (ثانیه)
                </label>
                <Input
                  id="settings-time-limit"
                  type="text"
                  value={toPersian(draft.timeLimit)}
                  disabled={gameStarted}
                  onChange={handleTimeInput}
                  onBlur={handleTimeBlur}
                />
                <p className="text-xs text-muted-foreground">
                  حداقل {toPersian(MIN_TIME_LIMIT)} حداکثر {toPersian(MAX_TIME_LIMIT)} ثانیه
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
