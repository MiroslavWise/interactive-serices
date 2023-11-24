"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TContainerOffersNow } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"

import styles from "./styles/style.module.scss"

export const ContainerOffersNow: TContainerOffersNow = ({
    isToMe,
    dispatch,
}) => {
    const { userId } = useAuth((_) => ({ userId: _.userId }))
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
        queryHash: `barters-user=${userId}-status=initiated`,
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
        <section
            className={cx(styles.containerOffersNow, isMobile && styles.mobile)}
        >
            <MotionUL>
                {Array.isArray(data)
                    ? data.map((item) => (
                          <CardOffer
                              key={`${item.id}-offer-page-${item.provider}`}
                              {...item}
                              refetch={refetch}
                          />
                      ))
                    : null}
            </MotionUL>
        </section>
    )
}
