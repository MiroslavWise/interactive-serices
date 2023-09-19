import { useMemo } from "react"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"

export const Header = () => {
    const { typeAdd } = useAddCreateModal()

    const text: { title: string } = useMemo(() => {
        if (!typeAdd) return { title: "", subTitle: "" }

        const obj: Record<TAddCreate, { title: string }> = {
            alert: {
                title: "Новое оповещение",
            },
            request: {
                title: "Добавить запрос",
            },
            offer: {
                title: "Добавить предложение",
            },
            discussion: {
                title: "Новое обсуждение",
            },
        }

        return obj[typeAdd]
    }, [typeAdd])

    return (
        <header className={styles.header}>
            {text.title ? <h3>{text.title}</h3> : null}
        </header>
    )
}
