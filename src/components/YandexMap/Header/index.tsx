"use client"

import { DispatchWithoutAction } from "react"

import { SearchElementMap } from "@/components/common"

import { useResize } from "@/helpers"

import styles from "./styles/style.module.scss"

export const Header = ({ handleAddressLocation }: { handleAddressLocation: DispatchWithoutAction }) => {
  const { isTablet } = useResize()

  return !isTablet ? (
    <div id="headerRef" className={styles.containerSearchTop} data-test="div-search-map">
      <SearchElementMap handleAddressLocation={handleAddressLocation} />
    </div>
  ) : null
}
