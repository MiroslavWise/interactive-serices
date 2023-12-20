"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { serviceBarters } from "@/services/barters"
import { useAuth, useVisibleExchanges } from "@/store/hooks"

import styles from "./style.module.scss"

export const ExchangesModalMobile = () => {
    const userId = useAuth(({ userId }) => userId)
    const type = useVisibleExchanges(({ type }) => type)
    const isVisible = useVisibleExchanges(({ isVisible }) => isVisible)
    const dispatchExchanges = useVisibleExchanges(({ dispatchExchanges }) => dispatchExchanges)

    const { data } = useQuery({
        queryFn: () =>
            serviceBarters.get({
                status: type,
                user: userId!,
                order: "DESC",
            }),
        queryKey: ["barters", `user=${userId}`, `status=${type}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: !!userId && isVisible,
    })

    return isMobile && userId ? (
        <div className={styles.wrapper} data-visible={isVisible}>
            <header>
                <div
                    className={styles.buttonBack}
                    onClick={() => {
                        dispatchExchanges({ visible: false })
                    }}
                >
                    <Image src="/svg/chevron-left.svg" alt="arrow-left" width={24} height={24} unoptimized />
                </div>
                <h4>{type === "executed" ? "Текущие" : type === "completed" ? "Завершённые" : ""}</h4>
            </header>
            <ul>
                {Array.isArray(data?.res)
                    ? data?.res?.map((item) => <CardOffer key={`${item.id}-history-page-${item.status}`} {...item} />)
                    : null}
            </ul>
        </div>
    ) : null
}
