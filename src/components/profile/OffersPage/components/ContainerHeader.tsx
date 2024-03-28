"use client"

import { useMemo } from "react"

import type { TContainerHeader } from "./types/types"

import styles from "./styles/style.module.scss"

export const ContainerHeader: TContainerHeader = ({ total }) => {
  const stringTotal: string | number = useMemo(() => {
    if (total <= 9 && total >= -9) {
      return `0${total}`
    }
    return total
  }, [total])

  return (
    <div className={styles.containerHeader}>
      <div className={styles.badgeTotal}>
        <h4>{stringTotal}</h4>
      </div>
      <h4>Предложения обменов, пришедшие к Вам</h4>
    </div>
  )
}
