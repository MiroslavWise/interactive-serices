"use client"

import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { dispatchCloseCustomerAbout } from "@/store"

function ButtonClosePseudoModalAboutProfile() {
  return (
    <button
      type="button"
      className={cx(
        "absolute right-1.5 md:-right-1 top-0.5 md:top-0 md:translate-x-full w-12 h-12 rounded-3xl p-3.5 flex items-center justify-center bg-transparent md:bg-BG-second border-none outline-none",
        "*:w-5 *:h-5 [&>svg>path]:stroke-text-primary",
      )}
      onClick={dispatchCloseCustomerAbout}
    >
      <IconXClose />
    </button>
  )
}

ButtonClosePseudoModalAboutProfile.displayName = "ButtonClosePseudoModalAboutProfile"
export default ButtonClosePseudoModalAboutProfile
