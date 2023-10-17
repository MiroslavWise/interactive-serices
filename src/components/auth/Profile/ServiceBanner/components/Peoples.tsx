"use client"

import { useQuery } from "react-query"

import type { TPeoples } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { GeneralServiceAllItem } from "@/components/common/Card"

import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"
import { useEffect } from "react"

export const Peoples: TPeoples = ({ setTotal }) => {
    const { data } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffer.get(),
    })

    const { ok, res } = data ?? {}

    useEffect(() => {
        setTotal(data?.res?.length || 0)
    }, [setTotal, data?.res])

    return (
        <MotionUL classNames={[styles.peoples]}>
            {ok &&
                res?.map((item) => (
                    <GeneralServiceAllItem
                        key={`${item.id}-all-item-service`}
                        {...item}
                    />
                ))}
        </MotionUL>
    )
}
