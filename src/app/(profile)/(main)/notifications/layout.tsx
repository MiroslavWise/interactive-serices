import { type Metadata } from "next"
import { type ReactNode } from "react"

import { cx } from "@/lib/cx"

export const metadata: Metadata = {
  title: "Уведомления",
  openGraph: { title: "Уведомления" },
  twitter: { title: "Уведомления" },
}

import main from "../layout.module.scss"

export default function LayoutNotification({ children }: { children: ReactNode }) {
  return (
    <section
      className={cx(
        main.wrapperInsideContainer,
        "md:h-[calc(100vh_-_var(--height-header-nav-bar))] hidden md:flex flex-col gap-4 pt-6 !-mt-6 overflow-x-hidden overflow-y-auto",
      )}
    >
      {children}
    </section>
  )
}
