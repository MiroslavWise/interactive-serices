import { type Metadata } from "next"
import { type ReactNode } from "react"

import { cx } from "@/lib/cx"

export const metadata: Metadata = {
  title: "Профиль",
  openGraph: { title: "Профиль" },
  twitter: { title: "Профиль" },
}

import main from "../layout.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
  return <ul className={cx(main.wrapperInsideContainer, "__container-profile-page__")}>{children}</ul>
}
