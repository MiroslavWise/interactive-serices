import { type Metadata } from "next"
import { type ReactNode } from "react"

import { cx } from "@/lib/cx"

export const metadata: Metadata = {
  title: "Предложения",
  openGraph: { title: "Предложения" },
  twitter: { title: "Предложения" },
}

import main from "../layout.module.scss"

export default function LayoutOffersMe({ children }: { children: ReactNode }) {
  return <ul className={cx(main.wrapperInsideContainer, "__container-offer-page__")}>{children}</ul>
}
