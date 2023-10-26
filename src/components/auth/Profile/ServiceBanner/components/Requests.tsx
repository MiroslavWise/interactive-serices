"use client"

import { useQuery } from "react-query"
import { useEffect, type Dispatch, type SetStateAction } from "react"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Requests = ({
    setTotal,
}: {
    setTotal: Dispatch<SetStateAction<number>>
}) => {
    const { data } = useQuery({
        queryFn: () =>
            serviceOffers.get({ provider: "request", order: "DESC" }),
        queryKey: ["offers", "provider=request"],
    })

    useEffect(() => {
        setTotal(data?.res?.length || 0)
    }, [setTotal, data?.res])

    return (
        <ul className={cx(styles.peoples, styles.requestsAndProposals)}>
            {Array.isArray(data?.res)
                ? data?.res?.map((item) => (
                      <CardRequestsAndProposals
                          key={`${item.id}-offer`}
                          {...item}
                          type="optional-2"
                      />
                  ))
                : null}
        </ul>
    )
}
