import { type INotes } from "@/services/notes/types"

import { IconSprite } from "@/components/icons/icon-sprite"

import { useContextPostsComments } from "./ContextComments"
import { NextImageMotion } from "@/components/common"

function ComponentNoteInComment({ note }: { note: INotes }) {
  const { onWriteResponse } = useContextPostsComments()
  const { description, images = [] } = note ?? {}

  return (
    <article className="w-fit max-w-96 relative grid grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-1 rounded-lg bg-element-grey py-[0.4375rem] px-3 hover:opacity-90 transition-opacity">
      <div className="w-fit">
        {!!description ? (
          <span className="text-text-button text-sm font-normal text-ellipsis line-clamp-1 max-w-full">{description}</span>
        ) : (
          <div className="flex flex-row flex-nowrap gap-0.5 items-center">
            <span className="text-text-button text-sm font-normal whitespace-nowrap">Фотографии:</span>
            {images.map((item) => (
              <div className="aspect-square w-5 h-5 rounded-sm overflow-hidden relative p-2.5" key={`sd-fd-s-${item.id}`}>
                <NextImageMotion
                  src={item.attributes.url}
                  hash={item.attributes.blur}
                  width={40}
                  height={40}
                  alt={item.attributes.name}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="button" className="w-5 h-5 relative p-2.5 *:w-5 *:h-5" onClick={() => onWriteResponse(null)}>
        <IconSprite id="x-close-20-20" />
      </button>
    </article>
  )
}

ComponentNoteInComment.displayName = "ComponentNoteInComment"
export default ComponentNoteInComment
