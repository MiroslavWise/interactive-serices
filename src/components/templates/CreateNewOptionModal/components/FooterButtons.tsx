"use client"

import { isMobile } from "react-device-detect"

import type { TFooterButtons } from "./types/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"

import styles from "./styles/footer-buttons.module.scss"

export const FooterButtons: TFooterButtons = ({
    disabled,
    handleNext,
    handleExit,
}) => {
    return (
        <footer className={cx(styles.footer, isMobile && styles.mobile)}>
            <ButtonDefault
                label="Отмена"
                classNames={styles.button}
                handleClick={handleExit}
            />
            <ButtonFill
                label="Следующий"
                type="primary"
                classNames={styles.button}
                handleClick={handleNext}
                disabled={disabled}
            />
        </footer>
    )
}
