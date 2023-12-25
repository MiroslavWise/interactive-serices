"use client"

import { dispatchOnboarding } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BannerStartCreate = () => {
    return (
        <div
            className={styles.container}
            onClick={(event) => {
                event.stopPropagation()
                dispatchOnboarding("open")
            }}
        >
            <h3>?</h3>
        </div>
    )
}
