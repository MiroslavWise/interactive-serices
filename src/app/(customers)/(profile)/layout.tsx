import { ReactNode } from "react"

import { GlassEllipses, NavBarProfile } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }:{children: ReactNode}) {
  return (
    <main className={styles.profileLayout}>
      <NavBarProfile />
      {children}
      <GlassEllipses />
    </main>
  )
}