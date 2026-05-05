import {cn, toPersian} from '@/lib/utils'

export function GameBoard({cards, flippedIds = [], matchedIds = [], onCardClick}) {
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
                'perspective-normal relative size-full transition-all',
                !isMatched && 'cursor-pointer sm:hover:-translate-y-1 sm:hover:scale-105'
              )}
              onClick={() => {
                if (!isMatched) onCardClick(card)
              }}
              role="button"
              tabIndex={0}
            >
              <div
                className="transform-3d relative size-full"
                style={{
                  transition: 'transform 0.6s cubic-bezier(.4,.2,.2,1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center select-none rounded-lg bg-primary text-lg text-primary-foreground backface-hidden sm:rounded-xl sm:text-2xl">
                  {toPersian(index + 1)}
                </div>

                <img
                  src={card.source}
                  className="absolute inset-0 rotate-y-180 backface-hidden select-none rounded-lg object-cover sm:rounded-xl"
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
