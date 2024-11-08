"use client"

import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { dispatchCloseMenuMobileOnUser } from "@/store"

const ButtonCloseMenuMobile = () => (
  <button
    type="button"
    title="Закрыть"
    aria-label="Закрыть"
    aria-labelledby="Закрыть"
    onClick={dispatchCloseMenuMobileOnUser}
    className={cx(
      "w-5 h-5 flex items-center justify-center bg-transparent border-none outline-none absolute top-4 right-5",
      "*:w-5 *:h-5 [&>svg>path]:stroke-text-primary",
    )}
  >
    <IconXClose />
  </button>
)

ButtonCloseMenuMobile.displayName = "ButtonCloseMenuMobile"
export default ButtonCloseMenuMobile
