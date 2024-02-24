"use client"

import { isMobile } from "react-device-detect"

import { LeftAsideProfile } from "@/components/profile"
import { ButtonNavigation } from "./components/ButtonNavigation"

import { dispatchCollapsePersonalScreen, useAuth, useCollapsePersonalScreen } from "@/store/hooks"

import styles from "./styles/button-collapse.module.scss"

export function BannerSign() {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visible = useCollapsePersonalScreen(({ visible }) => visible)

  if (typeof isAuth === "undefined") return null
  if (isMobile) return null

  return isAuth ? (
    <>
      <LeftAsideProfile isCollapsed={visible} />
      <button
        data-collapse={visible}
        className={styles.button}
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          dispatchCollapsePersonalScreen()
        }}
      >
        <img src="/svg/chevron-right-accent.svg" alt="right" width={12} height={12} />
      </button>
      <ButtonNavigation />
    </>
  ) : null
}
