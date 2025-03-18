import { type INotes } from "@/services/notes/types"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { dispatchDeleteNote } from "@/store"
import { useOutsideClickEvent } from "@/helpers"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

function DeletePopup({ note }: { note: INotes }) {
  const [open, set, ref] = useOutsideClickEvent()
  const isDeleteNote = useIsAllowAccess("DELETE", "notes", note?.id)
  if (!!note?.main) return null
  if (!isDeleteNote) return null

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
        <IconSprite id="dots-horizontal" className="w-4 h-4" />
      </button>
      <article
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-2xl shadow-box-down p-3 flex bg-BG-second w-max",
          open ? "opacity-100 visible z-50" : "opacity-0 invisible -z-10",
        )}
        onClick={(event) => {
          event.stopPropagation()
          set(false)
          if (isDeleteNote) {
            dispatchDeleteNote(note)
          }
        }}
      >
        <a className="w-full py-2 px-1.5 grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center rounded-md bg-BG-second hover:bg-grey-field cursor-pointer text-text-error">
          <div className="relative w-5 h-5">
            <IconSprite id="trash-20-20" className="w-5 h-5" />
          </div>
          <span className="text-sm font-normal whitespace-nowrap">Удалить запись</span>
        </a>
      </article>
    </div>
  )
}

DeletePopup.displayName = "DeletePopup"
export default DeletePopup
