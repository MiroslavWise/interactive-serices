"use client"

import { useEffect } from "react"
import { useQuery } from "react-query"

import type { TPeoples } from "./types/types"

import { GeneralServiceAllItem } from "@/components/common/Card"

import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Peoples: TPeoples = ({ setTotal }) => {
    const { data } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffers.get({ order: "DESC" }),
    })

    const { ok, res } = data ?? {}

    useEffect(() => {
        setTotal(data?.res?.length || 0)
    }, [setTotal, data?.res])

    return (
        <ul className={styles.peoples}>
            {ok &&
                res?.map((item) => (
                    <GeneralServiceAllItem
                        key={`${item.id}-all-item-service`}
                        {...item}
                    />
                ))}
        </ul>
    )
}
