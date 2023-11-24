"use client"

import { isMobile } from "react-device-detect"

import { FooterAsideLeft } from "./components/Footer"
import { BlockProfileAside } from "@/components/profile/BlockProfileAside"

import styles from "./style.module.scss"

export const LeftAsideProfile = () => {
    return (
        <aside className={styles.asideLeft} data-mobile={isMobile}>
            <BlockProfileAside />
            {typeof isMobile !== undefined && !isMobile ? (
                <FooterAsideLeft />
            ) : null}
        </aside>
    )
}
