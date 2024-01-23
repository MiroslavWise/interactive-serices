"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
//@ts-ignore
import Masonry from "react-responsive-masonry"

import type { TContainerServices } from "./types/types"

import { CardRequestsAndProposals } from "@/components/common/Card"

import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const ContainerServices: TContainerServices = ({}) => {
    const id = useSearchParams().get("id")

    const { data: dataOffer } = useQuery({
        queryFn: () => serviceOffers.getUserId(id!, { provider: "offer" }),
        queryKey: ["offers", { userId: id, provider: "offer" }],
    })

    const list = useMemo(() => {
        return dataOffer?.res?.filter((item) => item?.addresses?.length > 0) || []
    }, [dataOffer?.res])

    return (
        <section className={styles.containerServices}>
            {isMobile ? (
                <ul className={styles.containerRequestsAndProposals}>
                    {list?.map((item) => (
                        <CardRequestsAndProposals key={`::${item?.id}::item::key::offer::`} {...item} type="optional-3" />
                    ))}
                </ul>
            ) : (
                <Masonry gutter="16px" columnsCount={2}>
                    {list.map((item) => (
                        <CardRequestsAndProposals key={`::${item?.id}::item::key::offer::`} {...item} type="optional-3" />
                    ))}
                </Masonry>
            )}
        </section>
    )
}
