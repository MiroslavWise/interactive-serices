"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TContainerOffersNow } from "./types/types"

import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({ isToMe, dispatch }) => {
    const userId = useAuth(({ userId }) => userId)
    const { data: dataToMe, refetch: refetchToMe } = useQuery({
        queryFn: () =>
            serviceBarters.getReceiverId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", `receiver=${userId}`, `status=initiated`],
        refetchOnReconnect: false,
        queryHash: `barters-receiver=${userId}-status=initiated`,
        enabled: isToMe,
    })
    const { data: dataFromMe, refetch: refetchFromMe } = useQuery({
        queryFn: () =>
            serviceBarters.getUserId(userId!, {
                status: "initiated",
                order: "DESC",
            }),
        queryKey: ["barters", `user=${userId}`, `status=initiated`],
        refetchOnReconnect: false,
        enabled: !isToMe,
    })

    const data = useMemo(() => {
        if (isToMe) {
            const total = dataToMe?.res?.length || 0
            dispatch({ total: total })
            return dataToMe?.res
        } else {
            const total = dataFromMe?.res?.length || 0
            dispatch({ total: total })
            return dataFromMe?.res
        }
    }, [isToMe, dataToMe?.res, dataFromMe?.res, dispatch])

    function refetch() {
        isToMe ? refetchToMe() : refetchFromMe()
    }

    return (
        <section className={styles.containerOffersNow}>
            {Array.isArray(data) ? (
                <ul>
                    {data.map((item) => (
                        <CardOffer key={`${item.id}-offer-page-${item.provider}`} {...item} refetch={refetch} />
                    ))}
                </ul>
            ) : null}
        </section>
    )
}
