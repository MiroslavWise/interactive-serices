"use client"

import type { TFooterButtons } from "./types/types"

import { Button } from "@/components/common"

import styles from "./styles/footer-buttons.module.scss"

export const FooterButtons: TFooterButtons = ({
    disabled,
    handleNext,
    handleExit,
    loading,
}) => {
    return (
        <footer className={styles.footer}>
            <Button
                label="Отмена"
                typeButton="regular-primary"
                onClick={handleExit}
                loading={loading}
            />
            <Button
                label="Далее"
                typeButton="fill-primary"
                onClick={handleNext}
                disabled={!!disabled}
                loading={loading}
            />
        </footer>
    )
}
