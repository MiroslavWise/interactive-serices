"use client"

import { type ReactNode, useMemo } from "react"

import { Start } from "./components/Start"
import { FinishScreen } from "../components/FinishScreen"

import { useCreateDiscussion } from "@/store/state/useCreateDiscussion"

import styles from "./style.module.scss"

export const ModalAddDiscussion = () => {
    const { stepDiscussion } = useCreateDiscussion()

    const content: ReactNode = useMemo(
        () =>
            ({
                start: <Start />,
                end: <FinishScreen />,
            })[stepDiscussion],
        [stepDiscussion],
    )

    return <ul className={styles.container}>{content}</ul>
}
