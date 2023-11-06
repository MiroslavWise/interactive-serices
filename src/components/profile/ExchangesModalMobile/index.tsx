"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { Glasses } from "@/components/common/Glasses"
import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { serviceBarters } from "@/services/barters"
import { useAuth, useVisibleExchanges } from "@/store/hooks"

import styles from "./style.module.scss"

export const ExchangesModalMobile = () => {
    const { userId } = useAuth() ?? {}
    const { type, isVisible, setVisibleType } = useVisibleExchanges() ?? {}

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
                        setVisibleType({ visible: false })
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
