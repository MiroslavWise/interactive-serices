"use client"

import type { TFooter } from "./types/types"

import { Button } from "@/components/common"

import styles from "./styles/footer.module.scss"

export const Footer: TFooter = ({ loading }) => {
    return (
        <footer className={styles.container}>
            <Button
                type="submit"
                label="Сохранить"
                typeButton="fill-primary"
                className={styles.button}
                loading={loading}
            />
        </footer>
    )
}
