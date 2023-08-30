"use client"

import Image from "next/image"

import type { TSearchInput } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const SearchInput: TSearchInput = ({
    placeholder,
    classNames,
}) => {
    return (
        <div className={cx(styles.container, classNames)}>
            <Image
                className={styles.image}
                src="/svg/search-lg.svg"
                alt="search"
                width={20}
                height={20}
            />
            <input type="text" placeholder={placeholder} />
        </div>
    )
}
