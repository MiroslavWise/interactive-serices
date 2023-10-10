"use client"

import { type ReactNode, useMemo } from "react"

import { Start } from "./components/Start"
import { FinishScreen } from "../components/FinishScreen"

import { useCreateRequest } from "@/store/state/useCreateRequest"

import styles from "./style.module.scss"

export const ModalAddRequest = () => {
    const { stepRequest } = useCreateRequest()

    const content: ReactNode = useMemo(
        () =>
            ({
                start: <Start />,
                end: <FinishScreen />,
            })[stepRequest],
        [stepRequest],
    )

    return <ul className={styles.container}>{content}</ul>
}
