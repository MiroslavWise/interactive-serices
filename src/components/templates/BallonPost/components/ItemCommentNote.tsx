import { type Dispatch } from "react"
import { type INotes } from "@/services/notes/types"

import { NextImageMotion } from "@/components/common"
import { useContextPostsComments } from "./ContextComments"

function ItemCommentNote({ note, handleToNote }: { note?: INotes; handleToNote: Dispatch<number> }) {
  const { onNoteCurrent } = useContextPostsComments()

  if (!note) return null

  function handle() {
    handleToNote(note?.id!)
    onNoteCurrent(note?.id!)
  }

  if (note?.description) {
    return (
      <p className="text-text-secondary text-xs font-normal line-clamp-1 text-ellipsis cursor-pointer" onClick={handle}>
        Запись: {note?.description ?? null}
      </p>
    )
  }

  const images = note?.images ?? []

  return (
    <div className="w-full flex flex-row items-center gap-1 flex-nowrap cursor-pointer" onClick={handle}>
      <span className="text-text-secondary text-xs font-normal">Запись: Фотографии</span>
      <article className="flex flex-row flex-nowrap gap-0.5">
        {images.map((item) => (
          <div
            className="relative h-4 w-4 p-2 rounded-[0.0625rem] overflow-hidden *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
            key={`:key:img:${item.id}:`}
          >
            <NextImageMotion src={item.attributes.url} alt="offer-image" width={40} height={40} />
          </div>
        ))}
      </article>
    </div>
  )
}

ItemCommentNote.displayName = "ItemCommentNote"
export default ItemCommentNote
