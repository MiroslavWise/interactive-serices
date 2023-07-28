import { ReactNode } from "react"

import { GlassEllipses, NavBarProfile, NewServicesBanner } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
  return (
    <main className={styles.profileLayout}>
      <NavBarProfile />
      {children}
      <GlassEllipses />
      <NewServicesBanner />
    </main>
  )
}