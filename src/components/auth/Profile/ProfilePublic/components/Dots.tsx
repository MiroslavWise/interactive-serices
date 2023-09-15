"use client"

import Image from "next/image"

import type { TDots } from "./types"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./styles/style.module.scss"

export const Dots: TDots = ({ id }) => {
    const { handlePush } = usePush()

    return (
        <div className={styles.dots}>
            <Image
                src="/svg/maximize.svg"
                alt="max"
                width={28}
                height={28}
                className={cx("cursor-pointer")}
                onClick={() => {
                    handlePush(`/user?id=${id}`)
                }}
            />
            <Image
                src="/svg/dots-vertical-gray.svg"
                alt="max"
                width={28}
                height={28}
            />
        </div>
    )
}
