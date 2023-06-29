"use client"

import { useState } from "react"
import { isMobile } from "react-device-detect"

import type { TFilterFieldBottom } from "./types"

import { ButtonFilter } from "@/components/common/Buttons/ui/ButtonFilter"

import styles from "./styles/style.module.scss"

export const FilterFieldBottom: TFilterFieldBottom = ({ }) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(prev => !prev)
  }

  return (
    !isMobile ? (
      <section className={styles.container}>
        <ButtonFilter
          label="Настроить фильтры"
          active={active}
          handleClick={handleClick}
        />
      </section>
    ) : null
  )
}