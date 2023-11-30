"use client"

import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import type { TContainerServices } from "./types/types"

import { MotionUL } from "@/components/common/Motion"
import { CardRequestsAndProposals } from "@/components/common/Card"

import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerServices: TContainerServices = ({}) => {
    const id = useSearchParams().get("id")

    const { data: dataOffer } = useQuery({
        queryFn: () => serviceOffers.getUserId(Number(id), { provider: "offer" }),
        queryKey: ["offers", `user=${Number(id)}`, "provider=offer"],
    })

    return (
        <section className={styles.containerServices}>
            {isMobile ? (
                <MotionUL classNames={[styles.containerRequestsAndProposals]}>
                    {Array.isArray(dataOffer?.res)
                        ? dataOffer?.res?.map((item) => (
                              <CardRequestsAndProposals key={`${item?.id}-item-key-offer`} {...item} type="optional-3" />
                          ))
                        : null}
                </MotionUL>
            ) : (
                <Masonry gutter="16px" columnsCount={3}>
                    {Array.isArray(dataOffer?.res)
                        ? dataOffer?.res?.map((item) => (
                              <CardRequestsAndProposals key={`${item?.id}-item-key-offer`} {...item} type="optional-3" />
                          ))
                        : null}
                </Masonry>
            )}
        </section>
    )
}
