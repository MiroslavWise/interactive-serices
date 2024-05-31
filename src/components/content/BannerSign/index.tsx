"use client"

import { ButtonNavigation } from "./components/ButtonNavigation"
import LeftAsideProfile from "@/components/profile/LeftAsideProfile"

import { useResize } from "@/helpers"
import { dispatchCollapsePersonalScreen, useAdvertisingBanner, useAuth, useCollapsePersonalScreen } from "@/store"

import styles from "./styles/button-collapse.module.scss"

function BannerSign() {
  const { isTablet } = useResize()
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const visible = useCollapsePersonalScreen(({ visible }) => visible)
  const visibleAdvertisingBanner = useAdvertisingBanner(({ visible }) => visible)

  if (typeof isAuth === "undefined") return null
  if (isTablet) return null

  return isAuth ? (
    <>
      <LeftAsideProfile isCollapsed={visible} isBanner={visibleAdvertisingBanner} />
      <button
        data-collapse={visible}
        className={styles.button}
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          dispatchCollapsePersonalScreen()
        }}
        data-is-banner={visibleAdvertisingBanner}
      >
        <img src="/svg/chevron-right-accent.svg" alt="right" width={12} height={12} />
      </button>
      <ButtonNavigation />
    </>
  ) : null
}

BannerSign.displayName = "BannerSign"
export default BannerSign
