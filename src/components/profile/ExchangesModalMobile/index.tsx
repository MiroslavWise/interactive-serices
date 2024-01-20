"use client"

import { useQuery } from "@tanstack/react-query"

import { ButtonClose } from "@/components/common"
import { CardOffer } from "@/components/common/Card/Offer"

import { cx } from "@/lib/cx"
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

    function handleClose() {
        dispatchExchanges({ visible: false })
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisible}>
            <ButtonClose position={{}} onClick={handleClose} />
            <header>
                <h4>{type === "executed" ? "Текущие" : type === "completed" ? "Завершённые" : ""}</h4>
            </header>
            <ul>
                {Array.isArray(data?.res) ? data?.res?.map((item) => <CardOffer key={`::${item.id}::${item.status}::`} {...item} />) : null}
            </ul>
        </div>
    )
}
