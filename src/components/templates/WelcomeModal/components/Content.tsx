"use client"

import { type ReactNode, useMemo } from "react"
import { isMobile } from "react-device-detect"

import { One } from "./One"
import { Two } from "./Two"
import { Three } from "./Three"
import { Four } from "./Four"
import { Pagination } from "./Pagination"

import { cx } from "@/lib/cx"
import { useWelcomeModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Content = () => {
    const { page } = useWelcomeModal()

    const content: ReactNode = useMemo(
        () =>
            ({
                1: <One />,
                2: <Two />,
                3: <Three />,
                4: <Four />,
            })[page],
        [page],
    )

    return (
        <ul className={cx(styles.content, isMobile && styles.mobile)}>
            {content}
            <Pagination />
        </ul>
    )
}
