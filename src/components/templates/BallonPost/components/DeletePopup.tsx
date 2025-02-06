import { type INotes } from "@/services/notes/types"

import IconTrashBlack from "@/components/icons/IconTrashBlack"
import { SpriteDefault } from "@/components/icons/icon-sprite-default"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { dispatchDeleteNote, useAuth } from "@/store"

function DeletePopup({ note }: { note: INotes }) {
  const [open, set, ref] = useOutsideClickEvent()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  if (!!note?.main) return null
  if (userId !== note.userId) return null

  return (
    <div className="w-4 h-4 relative flex" ref={ref}>
      <button
        type="button"
        className="relative h-4 w-4 *:w-4 *:h-4 text-element-grey-light hover:text-element-accent-1"
        onClick={(event) => {
          event.stopPropagation()
          set((_) => !_)
        }}
      >
        <SpriteDefault id="dots-horizontal" />
      </button>
      <article
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-2xl shadow-box-down p-3 flex bg-BG-second w-max",
          open ? "opacity-100 visible z-50" : "opacity-0 invisible -z-10",
        )}
        onClick={(event) => {
          dispatchDeleteNote(note)
          event.stopPropagation()
          set(false)
        }}
      >
        <a className="w-full py-2 px-1.5 grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center rounded-md bg-BG-second hover:bg-grey-field cursor-pointer">
          <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-error">
            <IconTrashBlack />
          </div>
          <span className="text-text-error text-sm font-normal whitespace-nowrap">Удалить запись</span>
        </a>
      </article>
    </div>
  )
}

DeletePopup.displayName = "DeletePopup"
export default DeletePopup
