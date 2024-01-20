"use client"

import { useQuery } from "@tanstack/react-query"

import type { TSentenceCards } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store"
import { serviceBarters } from "@/services"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
    const userId = useAuth(({ userId }) => userId)
    const { data } = useQuery({
        queryFn: () =>
            serviceBarters.get({
                status: value.value,
                user: userId!,
                order: "DESC",
            }),
        queryKey: ["barters", `user=${userId}`, `status=${value.value}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: !!userId,
    })

    return (
        <ul className={styles.containerCards}>
            {Array.isArray(data?.res) ? data?.res?.map((item) => <CardOffer key={`::history::page::${item.status}::${item.id}::`} {...item} />) : null}
        </ul>
    )
}
