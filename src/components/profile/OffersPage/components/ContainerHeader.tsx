"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"

import type { TContainerHeader } from "./types/types"

import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"

export const ContainerHeader: TContainerHeader = ({ total }) => {
  
  const stringTotal: string | number = useMemo(() => {
    if (total <= 9 && total >= -9) {
      return `0${total}`
    }
    return total
  }, [total])

  return (
    <div className={cx(styles.containerHeader, isMobile && styles.mobile, "m-top-6 m-bottom-6")}>
      <div className={styles.badgeTotal}><h4>{stringTotal}</h4></div>
      <h4>Люди, приславшие вам предложения обмена.</h4>
    </div>
  )
}