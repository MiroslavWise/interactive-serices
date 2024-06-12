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
      <main className="h-full w-full overflow-hidden bg-transparent p-0 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-[1.25rem] px-0 flex flex-row justify-center z-[4] relative md:static">
        {children}
      </main>
    )
  ) : null
}
