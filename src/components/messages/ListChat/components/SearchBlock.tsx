"use client"

import { memo } from "react"
import { isMobile } from "react-device-detect"

import type { TSearchBlock } from "./types/types"

import { SegmentChatMobile } from "./SegmentChatMobile"
import { SearchInput } from "@/components/common/Inputs"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

const $SearchBlock: TSearchBlock = ({ search, setSearch }) => {
    if (isMobile) {
        return (
            <div className={cx(styles.blockSearch, styles.mobile)}>
                <SearchInput
                    placeholder="Поиск пользователя"
                    value={search}
                    setValue={setSearch}
                />
                <SegmentChatMobile />
            </div>
        )
    }

    return (
        <div className={cx(styles.blockSearch)}>
            <SearchInput
                placeholder="Поиск пользователя"
                value={search}
                setValue={setSearch}
            />
        </div>
    )
}

export const SearchBlock = memo($SearchBlock)
