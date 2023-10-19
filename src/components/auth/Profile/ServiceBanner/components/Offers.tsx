"use client"

import { useQuery } from "react-query"
import { useEffect, type Dispatch, type SetStateAction } from "react"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"

import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Offers = ({
    setTotal,
}: {
    setTotal: Dispatch<SetStateAction<number>>
}) => {
    const { data } = useQuery({
        queryFn: () => serviceOffers.get({ provider: "offer", order: "DESC" }),
        queryKey: ["offers", "provider=offer"],
    })

    useEffect(() => {
        setTotal(data?.res?.length || 0)
    }, [setTotal, data?.res])

    return (
        <MotionUL classNames={[styles.peoples, styles.requestsAndProposals]}>
            {Array.isArray(data?.res)
                ? data?.res?.map((item) => (
                      <CardRequestsAndProposals
                          key={`${item.id}-offer`}
                          {...item}
                          type="optional-3"
                      />
                  ))
                : null}
        </MotionUL>
    )
}
