"use client"

import { useMemo, type ReactNode } from "react"

import { Start } from "./components/Start"
import { FinishScreen } from "../components/FinishScreen"

import { useCreateAlert } from "@/store/state/useCreateAlert"

import styles from "./style.module.scss"

export const ModalAddAlert = () => {
    const { stepAlert } = useCreateAlert()

    const content: ReactNode = useMemo(
        () =>
            ({
                start: <Start />,
                end: <FinishScreen />,
            })[stepAlert],
        [stepAlert],
    )

    return <ul className={styles.container}>{content}</ul>
}
