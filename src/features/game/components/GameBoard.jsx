import { cn, toPersian } from '@/lib/utils'

export function GameBoard({ cards, flippedIds = [], matchedIds = [], onCardClick }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="grid aspect-square w-full grid-cols-4 grid-rows-4 gap-2 contain-[layout] sm:gap-3"
        dir="ltr"
      >
        {cards.map((card, index) => {
          const isFlipped = flippedIds.includes(card.id) || matchedIds.includes(card.id)
          const isMatched = matchedIds.includes(card.id)

          return (
            <div
              key={card.id}
              className={cn(
                'relative size-full transition-all perspective-normal',
                !isMatched && 'cursor-pointer sm:hover:-translate-y-1 sm:hover:scale-105'
              )}
              onClick={() => {
                if (!isMatched) onCardClick(card)
              }}
              role="button"
              tabIndex={0}
            >
              <div
                className="relative size-full transform-3d"
                style={{
                  transition: 'transform 0.6s cubic-bezier(.4,.2,.2,1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div className="bg-primary text-primary-foreground absolute inset-0 flex items-center justify-center rounded-lg text-lg select-none backface-hidden sm:rounded-xl sm:text-2xl">
                  {toPersian(index + 1)}
                </div>

                <img
                  src={card.source}
                  className="absolute inset-0 rotate-y-180 rounded-lg object-cover select-none backface-hidden sm:rounded-xl"
                  alt={`کارت ${toPersian(index + 1)}`}
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
