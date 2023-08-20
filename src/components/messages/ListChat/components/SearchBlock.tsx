"use client"

import { isMobile } from "react-device-detect"

import { SearchInput } from "@/components/common/Inputs"
import styles from "./styles/style.module.scss"
import { cx } from "@/lib/cx"

export const SearchBlock = () => {

  return (
    <div className={cx(styles.blockSearch, isMobile && styles.mobile)}>
      <SearchInput
        placeholder="Поиск пользователя"
      />
    </div>
  )
}