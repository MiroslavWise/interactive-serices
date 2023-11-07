"use client"

import { useQuery } from "@tanstack/react-query"

import type { TSentenceCards } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"

import { useAuth } from "@/store/hooks"
import { serviceBarters } from "@/services/barters"

import styles from "./styles/style.module.scss"

export const SentenceCards: TSentenceCards = ({ value }) => {
    const { userId } = useAuth()
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
        <MotionUL classNames={[styles.containerCards]}>
            {Array.isArray(data?.res)
                ? data?.res?.map((item) => (
                      <CardOffer
                          key={`${item.id}-history-page-${item.status}`}
                          {...item}
                      />
                  ))
                : null}
        </MotionUL>
    )
}
