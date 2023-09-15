"use client"

import { isMobile } from "react-device-detect"

import type { TFooter } from "./types/types"

import { ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"

import styles from "./styles/footer.module.scss"

export const Footer: TFooter = ({ loading }) => {
    return (
        <footer className={styles.container}>
            <ButtonFill
                label="Сохранить"
                classNames={cx(styles.button, isMobile && styles.mobile)}
                disabled={loading}
                submit="submit"
            />
        </footer>
    )
}
