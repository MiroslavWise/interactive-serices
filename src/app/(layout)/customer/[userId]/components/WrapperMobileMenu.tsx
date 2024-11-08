"use client"

import { useEffect, type ReactNode } from "react"

import { cx } from "@/lib/cx"
import { dispatchCloseMenuMobileOnUser, useMenuMobileOnUser } from "@/store"

function WrapperMobileMenu({ children }: { children: ReactNode }) {
  const visible = useMenuMobileOnUser(({ visible }) => visible)
  useEffect(() => {
    return () => dispatchCloseMenuMobileOnUser()
  }, [])

  return (
    <div
      className={cx(
        "flex md:hidden fixed flex-col justify-end inset-0 -z-10 opacity-0 invisible bg-translucent",
        visible && "!opacity-100 !visible !z-[1000]",
      )}
    >
      {children}
    </div>
  )
}

WrapperMobileMenu.displayName = "WrapperMobileMenu"
export default WrapperMobileMenu
