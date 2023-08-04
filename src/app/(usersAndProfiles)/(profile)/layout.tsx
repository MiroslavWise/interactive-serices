"use client"

import { ReactNode } from "react"
import { isMobile } from "react-device-detect"

import { NavBarProfile } from "@/components/profile"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({
  children,
}: {
  children: ReactNode,
}) {
  return (
    <main className={styles.profileLayout}>
      {
        isMobile
          ? children
          : (
            <>
              <NavBarProfile />
              {children}
            </>
          )
      }
    </main>
  )
}