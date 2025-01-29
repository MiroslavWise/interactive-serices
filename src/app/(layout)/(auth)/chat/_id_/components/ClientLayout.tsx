"use client"

import { type ReactNode } from "react"

import { cx } from "@/lib/cx"
import { useCollapseChat } from "@/store"

function ClientLayout({ children }: { children: ReactNode }) {
  const collapse = useCollapseChat(({ collapse }) => collapse)

  return (
    <main
      className={cx(
        "w-full md:grid md:gap-6 max-md:max-h-dvh max-md:h-screen max-md:grid-cols-[minmax(0,1fr)]",
        collapse ? "md:grid-cols-[minmax(0,1fr)] last:*:!hidden" : "md:grid-cols-[minmax(0,1fr)_21.25rem]",
      )}
    >
      {children}
    </main>
  )
}

ClientLayout.displayName = "ClientLayout"
export default ClientLayout
