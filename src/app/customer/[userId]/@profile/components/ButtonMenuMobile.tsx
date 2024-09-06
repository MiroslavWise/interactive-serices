"use client"

import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { dispatchOpenMenuMobileOnUser } from "@/store"

function ButtonMenuMobile() {
  return (
    <button
      type="button"
      onClick={dispatchOpenMenuMobileOnUser}
      className="flex md:hidden relative items-center justify-center w-9 h-9 p-[1.125rem] rounded-[1.125rem] bg-btn-second-default [&>svg>path]:fill-text-secondary *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:h-5 *:w-5"
    >
      <IconDotsHorizontal />
    </button>
  )
}

ButtonMenuMobile.displayName = "ButtonMenuMobile"
export default ButtonMenuMobile
