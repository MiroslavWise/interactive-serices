"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TContainerOffersNow } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({ dispatch }) => {
    const userId = useAuth(({ userId }) => userId)
    const { data, refetch } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", { receiver: userId, status: "initiated" }],
        refetchOnReconnect: false,
        refetchOnMount: false,
    })

    useEffect(() => {
        if (data?.ok) {
            dispatch({ total: data?.res?.length || 0 })
        }
    }, [data])

    return (
        <section className={styles.containerOffersNow}>
            {Array.isArray(data?.res) ? (
                <ul>
                    {data?.res.map((item) => (
                        <CardOffer key={`${item.id}-offer-page-${item.provider}`} {...item} refetch={refetch} />
                    ))}
                </ul>
            ) : null}
        </section>
    )
}
