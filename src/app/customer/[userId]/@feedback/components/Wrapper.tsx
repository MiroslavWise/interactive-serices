"use client"

import { type ReactNode } from "react"

import { cx } from "@/lib/cx"
import { useVisibleFeedbackMobileCustomer } from "@/store"

function Wrapper({ children }: { children: ReactNode }) {
  const visible = useVisibleFeedbackMobileCustomer(({ visible }) => visible)

  console.log("Wrapper visible: ", visible)

  return (
    <aside
      className={cx(
        "w-full h-full md:rounded-[2rem] overflow-hidden bg-BG-second flex flex-col justify-start pt-5 px-5 md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_1.5rem_-_1.5rem)]",
        "max-md:fixed max-md:hidden max-md:inset-0 max-md:translate-x-full max-md:-z-10",
        visible && "max-md:!flex max-md:!translate-x-0 !z-[1000]",
      )}
    >
      {children}
    </aside>
  )
}

Wrapper.displayName = "Wrapper"
export default Wrapper
