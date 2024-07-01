"use client"

import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { dispatchVisibleFeedbackMobileCustomer } from "@/store"

function ButtonClose() {
  return (
    <button
      type="button"
      className={cx(
        "md:hidden flex absolute items-center justify-center bg-transparent border-none outline-none w-11 h-11 top-0 right-0 p-3",
        "[&>svg]:w-5 [&>svg]:h-5",
      )}
      onClick={() => dispatchVisibleFeedbackMobileCustomer(false)}
    >
      <IconXClose />
    </button>
  )
}

ButtonClose.displayName = "ButtonClose"
export default ButtonClose
