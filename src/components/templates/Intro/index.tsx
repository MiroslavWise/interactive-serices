"use client"

import { cx } from "@/lib/cx"
import { useIntro } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Intro = () => {
    const visible = useIntro(({ visible }) => visible)

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            <section></section>
        </div>
    )
}
