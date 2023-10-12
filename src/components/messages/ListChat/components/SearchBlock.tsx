"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import type { TSearchBlock } from "./types/types"

import { SearchInput } from "@/components/common/Inputs"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

const $SearchBlock: TSearchBlock = ({ search, setSearch }) => {
    return (
        <div className={cx(styles.blockSearch, isMobile && styles.mobile)}>
            <SearchInput
                placeholder="Поиск пользователя"
                value={search}
                setValue={setSearch}
            />
        </div>
    )
}

export const SearchBlock = memo($SearchBlock)
