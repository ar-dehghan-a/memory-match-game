import {useSettings} from '@/providers/settings-provider'
import {toEnglish, toPersian} from '@/lib/utils'
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
import {MAX_MOVE_LIMIT, MAX_TIME_LIMIT} from '../constants'
import {Settings, Monitor, Moon, Sun} from 'lucide-react'

const themes = [
  {id: 'light', label: 'روشن', Icon: Sun},
  {id: 'dark', label: 'تاریک', Icon: Moon},
  {id: 'system', label: 'سیستم', Icon: Monitor},
]

const parseNumber = value => {
  const digits = toEnglish(value)
  const n = parseInt(digits, 10)
  return Number.isNaN(n) ? 0 : n
}

export function GameSettingsDialog({gameStarted}) {
  const {theme, setTheme, settings, setSettings} = useSettings()

  const handleMoveInput = e => {
    const n = parseNumber(e.target.value)
    setSettings(prev => ({
      ...prev,
      moveLimit: Math.min(n, MAX_MOVE_LIMIT),
    }))
  }

  const handleTimeInput = e => {
    const n = parseNumber(e.target.value)
    setSettings(prev => ({
      ...prev,
      timeLimit: Math.min(n, MAX_TIME_LIMIT),
    }))
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
                برای تغییر حد حرکت یا زمان، بازی را تمام کنید یا شروع مجدد بزنید.
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
                  value={toPersian(settings.moveLimit)}
                  disabled={gameStarted}
                  onChange={handleMoveInput}
                />
                <p className="text-xs text-muted-foreground">حداکثر تا {toPersian(MAX_MOVE_LIMIT)} حرکت</p>
              </div>

              <div className="space-y-1.5 text-start">
                <label htmlFor="settings-time-limit" className="text-sm font-medium">
                  زمان (ثانیه)
                </label>
                <Input
                  id="settings-time-limit"
                  type="text"
                  value={toPersian(settings.timeLimit)}
                  disabled={gameStarted}
                  onChange={handleTimeInput}
                />
                <p className="text-xs text-muted-foreground">حداکثر تا {toPersian(MAX_TIME_LIMIT)} ثانیه</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
