import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"
import { dispatchRoleAdditionUser } from "@/store/state/useRoleAdditionUser"
import { IUserResponse } from "@/services/users/types"

function ComponentsDotsUser(props: IUserResponse) {
  const isSuper = useIsAllowAccess("PATCH", "users")
  const [open, setOpen, ref] = useOutsideClickEvent()

  return (
    <div className="absolute top-2 right-2" ref={ref}>
      <button
        type="button"
        className="w-5 h-5 p-0.5 flex items-center justify-center text-element-grey-light hover:text-element-accent-1 relative"
        onClick={(event) => {
          event.stopPropagation()
          if (isSuper) {
            setOpen((_) => !_)
          }
        }}
      >
        <IconSprite id="dots-horizontal" className="w-4 h-4" />
      </button>
      <article
        className={cx(
          "absolute right-0 top-[calc(100%_+_0.25rem)] bg-BG-second rounded-xl p-3 flex flex-col w-[13.5rem] gap-0.5 shadow-box-down",
          open ? "z-50 opacity-100 visible pointer-events-auto" : "z-0 opacity-0 invisible pointer-events-none",
        )}
      >
        <a
          className={cx(
            "w-full grid-cols-[1.25rem_minmax(0,1fr)] gap-2.5 items-center py-2 px-1.5 rounded-md bg-BG-second hover:bg-grey-field cursor-pointer",
            isSuper ? "grid" : "hidden",
            "text-text-primary text-sm font-normal",
          )}
          onClick={(event) => {
            event.stopPropagation()
            dispatchRoleAdditionUser(props)
            setOpen(false)
          }}
        >
          <div className="relative w-5 h-5 aspect-square p-2.5">
            <IconSprite id="icon-user-edit" className="w-5 h-5 aspect-square" />
          </div>
          <span className="text-left whitespace-nowrap">Добавить роль</span>
        </a>
      </article>
    </div>
  )
}

ComponentsDotsUser.displayName = "ComponentsDotsUser"
export default ComponentsDotsUser
