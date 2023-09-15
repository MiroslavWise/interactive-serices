import { useMemo } from "react"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { useAddCreateModal } from "@/store/state/useAddCreateModal"

import styles from "./styles/style.module.scss"

export const Header = () => {
    const { typeAdd } = useAddCreateModal()

    const text: { title: string; subTitle: string } = useMemo(() => {
        if (!typeAdd) return { title: "", subTitle: "" }

        const obj: Record<TAddCreate, { title: string; subTitle: string }> = {
            alert: {
                title: "Новое оповещение",
                subTitle:
                    "Видите, что что-то произошло, или вам нужна помощь? Просто дайте знать остальным",
            },
            request: {
                title: "Добавить запрос",
                subTitle:
                    "Выберите услугу, которую хотите получить, в раскрывающемся меню ниже.",
            },
            offer: {
                title: "Добавить предложение",
                subTitle: "",
            },
            discussion: {
                title: "Новое обсуждение",
                subTitle:
                    "Хотите что-то обсудить с другими пользователями Sheira? Создайте тему и будьте готовы участвовать в обсуждении!",
            },
        }

        return obj[typeAdd]
    }, [typeAdd])

    return (
        <header className={styles.header}>
            {text.title ? <h3>{text.title}</h3> : null}
            {text.subTitle ? <p>{text.subTitle}</p> : null}
        </header>
    )
}
