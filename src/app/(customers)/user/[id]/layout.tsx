import { ReactNode } from "react"

import { GlassEllipses, NavBar } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutProfileId({ children }:{children: ReactNode}) {
  
  return (
    <main className={styles.profileLayout}>
      <NavBar />
      {children}
      <GlassEllipses />
    </main>
  )
}