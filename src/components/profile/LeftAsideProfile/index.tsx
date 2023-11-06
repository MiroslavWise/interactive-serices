"use client"

import { isMobile } from "react-device-detect"

import { BlockProfileAside } from "@/components/profile/BlockProfileAside"
import { FooterAsideLeft } from "./components/Footer"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const LeftAsideProfile = () => {
    return (
        <aside className={cx(styles.asideLeft, isMobile && styles.mobile)}>
            <BlockProfileAside />
            {typeof isMobile !== undefined && !isMobile ? (
                <FooterAsideLeft />
            ) : null}
        </aside>
    )
}
