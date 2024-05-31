"use client"

import { useEffect, type ReactNode } from "react"

import { MobileChangeAbout } from "@/components/templates"

import { usePush, useResize } from "@/helpers"
import { useAuth, useMobileChangeAbout } from "@/store"

import styles from "@/scss/page.module.scss"

export default function LayoutProfile({ children }: { children: ReactNode }) {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visible = useMobileChangeAbout(({ visible }) => visible)
  const { handlePush } = usePush()

  const { isTablet } = useResize()

  useEffect(() => {
    if (typeof isAuth !== "undefined" && !isAuth) {
      handlePush("/")
    }
  }, [isAuth])

  return isAuth ? (
    isTablet ? (
      <>
        {children}
        {visible && <MobileChangeAbout />}
      </>
    ) : (
      <main className={styles.profileLayout}>{children}</main>
    )
  ) : null
}
