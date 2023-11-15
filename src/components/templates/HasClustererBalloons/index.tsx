"use client"

import { useMemo } from "react"
import { useQueries } from "@tanstack/react-query"

import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"
import { useHasBalloons } from "@/store/hooks"
import { GeneralServiceAllItem } from "@/components/common/Card"

import styles from "./styles/style.module.scss"

export const HasClustererBalloons = () => {
    const { visibleHasBalloon, dispatchHasBalloon, data } = useHasBalloons()

    const dataOffers = useQueries({
        queries:
            data?.ids?.map((item) => ({
                queryFn: () => serviceOffers.getId(Number(item?.id!)),
                queryKey: [
                    "offers",
                    `offer=${item.id!}`,
                    `provider=${item?.provider!}`,
                ],
                refetchOnMount: false,
                enabled: visibleHasBalloon && !!item?.id,
            })) || [],
    })

    const offers = useMemo(() => {
        if (dataOffers.every((item) => !item?.isLoading)) {
            return dataOffers?.map((item) => item?.data?.res)
        }

        return []
    }, [dataOffers])

    const isLoading = useMemo(() => {
        return dataOffers.some((item) => item.isLoading)
    }, [dataOffers])

    return (
        <div
            className={cx("wrapper-fixed", styles.wrapper)}
            data-visible={visibleHasBalloon}
        >
            <section>
                <ButtonClose
                    onClick={() => {
                        dispatchHasBalloon({ visible: false })
                    }}
                    position={{ right: 12, top: 12 }}
                />
                <header>
                    <p>
                        Сервисы по адресу:{" "}
                        <span>{data?.address?.additional}</span>
                    </p>
                </header>
                <ul>
                    {offers.map((item) => (
                        <GeneralServiceAllItem
                            key={`${item?.id}-offer-cluster`}
                            {...item!}
                        />
                    ))}
                </ul>
            </section>
        </div>
    )
}
