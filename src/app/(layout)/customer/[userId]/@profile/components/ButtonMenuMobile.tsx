"use client"

import { IconSprite } from "@/components/icons/icon-sprite"
import { dispatchOpenMenuMobileOnUser } from "@/store"

function ButtonMenuMobile() {
  return (
    <button
      type="button"
      onClick={dispatchOpenMenuMobileOnUser}
      className="flex md:hidden relative items-center justify-center w-9 h-9 p-[1.125rem] rounded-[1.125rem] bg-btn-second-default *:h-5 *:w-5 text-element-grey-light hover:text-element-accent-1"
    >
      <IconSprite id="dots-horizontal" />
    </button>
  )
}

ButtonMenuMobile.displayName = "ButtonMenuMobile"
export default ButtonMenuMobile
