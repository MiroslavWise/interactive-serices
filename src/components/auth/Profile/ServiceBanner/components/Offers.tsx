"use client"

import { useQuery } from "react-query"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"

import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Offers = () => {
    const { data } = useQuery({
        queryFn: () => serviceOffer.get({ provider: "offer" }),
        queryKey: ["offers", "provider=offer"],
    })

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
