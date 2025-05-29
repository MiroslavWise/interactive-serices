"use client"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { dispatchVisibleFeedbackMobileCustomer } from "@/store"

function ButtonClose() {
  return (
    <button
      type="button"
      className={cx(
        "md:hidden flex absolute items-center justify-center bg-transparent border-none outline-none w-11 h-11 top-0 right-0 p-3",
        "*:w-5 *:h-5",
      )}
      onClick={() => dispatchVisibleFeedbackMobileCustomer(false)}
    >
      <IconSprite id="x-close-20-20" />
    </button>
  )
}

ButtonClose.displayName = "ButtonClose"
export default ButtonClose
