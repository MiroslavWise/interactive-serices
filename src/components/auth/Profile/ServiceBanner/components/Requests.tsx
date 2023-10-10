"use client"

import { useQuery } from "react-query"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"

import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Requests = () => {
    const { data } = useQuery({
        queryFn: () => serviceOffer.get({ provider: "request" }),
        queryKey: ["offers", "provider=request"],
    })

    return (
        <MotionUL classNames={[styles.peoples, styles.requestsAndProposals]}>
            {Array.isArray(data?.res)
                ? data?.res?.map((item) => (
                      <CardRequestsAndProposals
                          key={`${item.id}-offer`}
                          {...item}
                          type="optional-2"
                      />
                  ))
                : null}
        </MotionUL>
    )
}
