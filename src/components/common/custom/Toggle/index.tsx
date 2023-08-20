"use client"

import type { TCustomToggle } from "./types"

import styles from "./style.module.scss"
import { useState } from "react"
import { cx } from "@/lib/cx"

export const CustomToggle: TCustomToggle = ({
  isActive, setIsActive
}) => {
  function handleActive() { setIsActive(prev => !prev) }
  return (
    <div className={cx(styles.container, isActive && styles.active)} onClick={handleActive}>
      <div className={styles.circle} />
    </div>
  )
}