import { ReactNode } from "react"

import { GlassEllipses, NavBarUser } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutProfileId({ children }:{children: ReactNode}) {
  
  return (
    <main className={styles.profileLayout}>
      <NavBarUser />
      {children}
      <GlassEllipses />
    </main>
  )
}