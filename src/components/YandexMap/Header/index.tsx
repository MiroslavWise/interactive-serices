"use client"

import type { THeaderMobile } from "./types"

import { SearchElementMap } from "@/components/common"

import { useResize } from "@/helpers"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = ({ handleAddressLocation }) => {
  const { isTablet } = useResize()

  return !isTablet ? (
    <div id="headerRef" className={styles.containerSearchTop} data-test="div-search-map">
      <SearchElementMap handleAddressLocation={handleAddressLocation} />
    </div>
  ) : null
}
