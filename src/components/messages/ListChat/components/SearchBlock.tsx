"use client"

import { memo } from "react"

import type { TSearchBlock } from "./types/types"

import { SearchInput } from "@/components/common/Inputs"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const SearchBlock: TSearchBlock = memo(({ search, setSearch }) => {
  return (
    <div className={cx(styles.blockSearch)}>
      <SearchInput placeholder="Поиск пользователя" value={search} setValue={setSearch} />
    </div>
  )
})
