import { type Metadata } from "next"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import AsideMenu from "./components/AsideMenu"

export const metadata: Metadata = {
  title: "Компания",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default ({ children }: { children: React.ReactNode }) => (
  <main className={cx(styles.main, "w-full grid px-6 gap-6 pb-6")}>
    <AsideMenu />
    {children}
  </main>
)
