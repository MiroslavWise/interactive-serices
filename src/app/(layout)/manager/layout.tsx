import { type Metadata } from "next"

import AsideMenu from "./components/AsideMenu"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const metadata: Metadata = {
  title: "Панель менеджера",
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
