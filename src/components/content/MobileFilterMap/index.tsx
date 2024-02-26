"use client"

import { dispatchVisibleFilterMobileButton, useMobileFilterButton } from "@/store"

import styles from "./styles/style.module.scss"

export const MobileFilterMap = () => {
  const visible = useMobileFilterButton(({ visible }) => visible)

  return (
    <div
      className={styles.container}
      data-visible={visible}
      onClick={(event) => {
        event.stopPropagation()
        dispatchVisibleFilterMobileButton(true)
      }}
    >
      <img src="/svg/sliders-01.svg" alt="sliders-white" width={24} height={24} />
    </div>
  )
}
