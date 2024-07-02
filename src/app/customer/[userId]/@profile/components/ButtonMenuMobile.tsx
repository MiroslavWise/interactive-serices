"use client"

import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { dispatchOpenMenuMobileOnUser } from "@/store"

function ButtonMenuMobile() {
  return (
    <button
      type="button"
      onClick={dispatchOpenMenuMobileOnUser}
      className="flex md:hidden relative items-center justify-center w-9 h-9 p-[1.125rem] rounded-[1.125rem] bg-btn-second-default [&>svg>path]:fill-text-secondary [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:h-5 [&>svg]:w-5"
    >
      <IconDotsHorizontal />
    </button>
  )
}

ButtonMenuMobile.displayName = "ButtonMenuMobile"
export default ButtonMenuMobile
