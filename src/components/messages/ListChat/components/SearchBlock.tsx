"use client"

import { isMobile } from "react-device-detect"

import { SearchInput } from "@/components/common/Inputs"

import { cx } from "@/lib/cx"
import { useSearchChats } from "@/helpers/hooks/useSearchChats"

import styles from "./styles/style.module.scss"

export const SearchBlock = () => {
    const { set, search } = useSearchChats()
    return (
        <div className={cx(styles.blockSearch, isMobile && styles.mobile)}>
            <SearchInput
                placeholder="Поиск пользователя"
                value={search}
                setValue={set}
            />
        </div>
    )
}
