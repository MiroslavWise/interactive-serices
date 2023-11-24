"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import { Glasses } from "@/components/common/Glasses"
import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { serviceBarters } from "@/services/barters"
import { useAuth, useVisibleExchanges } from "@/store/hooks"

import styles from "./style.module.scss"

export const ExchangesModalMobile = () => {
    const { userId } = useAuth((_) => ({ userId: _.userId }))
    const { type, isVisible, dispatchExchanges } = useVisibleExchanges((_) => ({
        type: _.type,
        isVisible: _.isVisible,
        dispatchExchanges: _.dispatchExchanges,
    }))

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
                    <Image
                        src="/svg/chevron-left.svg"
                        alt="arrow-left"
                        width={24}
                        height={24}
                    />
                </div>
                <h4>
                    {type === "executed"
                        ? "Текущие"
                        : type === "completed"
                        ? "Завершённые"
                        : ""}
                </h4>
            </header>
            <MotionUL>
                {Array.isArray(data?.res)
                    ? data?.res?.map((item) => (
                          <CardOffer
                              key={`${item.id}-history-page-${item.status}`}
                              {...item}
                          />
                      ))
                    : null}
            </MotionUL>
            <Glasses />
        </div>
    ) : null
}
