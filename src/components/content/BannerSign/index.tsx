"use client"

import LeftAsideProfile from "@/components/profile/LeftAsideProfile"

import { cx } from "@/lib/cx"
import { dispatchCollapsePersonalScreen, useAdvertisingBanner, useCollapsePersonalScreen } from "@/store"

import styles from "./styles/button-collapse.module.scss"

function BannerSign() {
  const visible = useCollapsePersonalScreen(({ visible }) => visible)
  const visibleAdvertisingBanner = useAdvertisingBanner(({ visible }) => visible)

  return (
    <>
      <LeftAsideProfile isCollapsed={visible} isBanner={visibleAdvertisingBanner} />
      <button
        data-collapse={visible}
        className={cx(
          styles.button,
          "fixed left-0 w-8 h-8 rounded-full border-none outline-none z-[60] p-2.5 flex items-center justify-center bg-BG-second",
          "top-[calc(var(--height-header-nav-bar)_+_2.75rem)]",
        )}
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          dispatchCollapsePersonalScreen()
        }}
      >
        <img
          className={cx("w-3 h-3", visible ? "rotate-0" : " rotate-180")}
          src="/svg/chevron-right-accent.svg"
          alt="right"
          width={12}
          height={12}
        />
      </button>
    </>
  )
}

BannerSign.displayName = "BannerSign"
export default BannerSign
