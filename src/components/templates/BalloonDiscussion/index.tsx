"use client"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const BalloonDiscussion = () => {
    return (
        <div className={cx("wrapper-fixed")}>
            <section data-section-modal></section>
        </div>
    )
}
