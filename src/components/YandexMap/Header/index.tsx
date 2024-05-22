"use client"

import type { THeaderMobile } from "./types"

import { SearchElementMap } from "@/components/common"

import { useResize } from "@/helpers"
import { useAdvertisingBanner } from "@/store"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = ({ handleAddressLocation }) => {
  const { isTablet } = useResize()
  const visibleAdvertisingBanner = useAdvertisingBanner(({ visible }) => visible)

  return !isTablet ? (
    <div
      id="headerRef"
      className={styles.containerSearchTop}
      style={{
        top: visibleAdvertisingBanner ? `calc(6.3125rem + 2.75rem)` : `6.3125rem`,
      }}
      data-test="div-search-map"
    >
      <SearchElementMap handleAddressLocation={handleAddressLocation} />
    </div>
  ) : null
}
