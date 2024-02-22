"use client"

import { useState } from "react"

import type { TFilterFieldBottom } from "./types"

import { PopupFilter } from "./PopupFilter"
import { ButtonFilter } from "@/components/common"

import styles from "./styles/style.module.scss"

export const FilterFieldBottom: TFilterFieldBottom = ({}) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive((prev) => !prev)
  }

  return (
    <div className={styles.container}>
      <ButtonFilter label="Настроить фильтры" active={active} handleClick={handleClick} />
      <PopupFilter visible={active} setVisible={setActive} />
    </div>
  )
}
