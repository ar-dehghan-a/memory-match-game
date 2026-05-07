import { GameSettingsDialog } from '@/features/game'

function Header({ gameStarted }) {
  return (
    <>
      <GameSettingsDialog gameStarted={gameStarted} />

      <h1 className="text-center text-xl font-bold sm:text-3xl">بازی پیدا کردن محصولات</h1>

      <div className="size-9" />
    </>
  )
}

export default Header
