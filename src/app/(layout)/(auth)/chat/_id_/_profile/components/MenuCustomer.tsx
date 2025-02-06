"use client"

import { type IUserResponse } from "@/services/users/types"

import IconTrashBlack from "@/components/icons/IconTrashBlack"
import { SpriteDefault } from "@/components/icons/icon-sprite-default"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import { dispatchComplaintModalUser, dispatchOpenDeleteChat } from "@/store"

function MenuCustomer({ user, id }: { user: IUserResponse; id: string | number }) {
  const [open, set, ref] = useOutsideClickEvent()

  function onComplaint() {
    const { profile } = user ?? {}

    dispatchComplaintModalUser({
      user: {
        about: profile?.about ?? "",
        birthdate: null,
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName || "",
        image: profile?.image!,
        username: profile?.username ?? "",
        id: user?.id!,
        gender: profile?.gender!,
      },
    })
  }

  return (
    <button
      type="button"
      className="[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:h-5 [&>svg]:w-5 text-element-grey-light hover:text-element-accent-1"
      ref={ref}
      onClick={() => set((_) => !_)}
    >
      <SpriteDefault id="dots-horizontal" />
      <article
        className={cx(
          "absolute -right-[2.125rem] rounded-xl bg-BG-second shadow-menu-absolute p-3 w-44 flex flex-col gap-0.5 -top-2.5 -translate-y-full",
          "*:w-full *:rounded-md hover:*:bg-grey-field *:py-2 *:px-1.5 *:gap-2.5 *:grid *:grid-cols-[1.25rem_minmax(0,1fr)] [&>a>span]:items-center [&>a>span]:text-sm [&>a>span]:font-normal [&>a>span]:text-text-error",
          open ? "!opacity-100 !visible !z-50" : "!opacity-0 !invisible -z-10",
        )}
      >
        <a
          onClick={(event) => {
            event.stopPropagation()
            set(false)
            onComplaint()
          }}
        >
          <div className="relative w-5 h-5 p-2.5">
            <SpriteDefault id="icon-complaint" className="text-text-error w-5 h-5" />
          </div>
          <span>Пожаловаться</span>
        </a>
        <a
          onClick={(event) => {
            event.stopPropagation()
            set(false)
            dispatchOpenDeleteChat(id)
          }}
        >
          <div className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:!fill-text-error">
            <IconTrashBlack />
          </div>
          <span>Удалить чат</span>
        </a>
      </article>
    </button>
  )
}

MenuCustomer.displayName = "MenuCustomer"
export default MenuCustomer
