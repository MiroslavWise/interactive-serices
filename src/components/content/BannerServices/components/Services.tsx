"use client"

import { useQuery } from "@tanstack/react-query"
import { memo, useEffect, useMemo } from "react"

import type { TServicesFC } from "../types/types"
import type { TOrder } from "@/services/types/general"
import type { TTypeProvider } from "@/services/file-upload/types"

import {
    CardRequestsAndProposals,
    GeneralServiceAllItem,
} from "@/components/common/Card"

import { serviceOffers } from "@/services/offers"

import { cx } from "@/lib/cx"

import styles from "../styles/style.module.scss"

//services

export const ServicesComponent: TServicesFC = memo(function $ServicesComponent({
    setTotal,
    type,
}) {
    const typeOffers = useMemo(() => {
        if (["offer", "request"].includes(type)) {
            return {
                get: {
                    provider: type as TTypeProvider,
                    order: "DESC" as TOrder,
                },
                keys: ["offers", `provider=${type}`],
            }
        } else {
            return {
                get: {
                    order: "DESC" as TOrder,
                },
                keys: ["offers"],
            }
        }
    }, [type])

    const { data } = useQuery({
        queryFn: () => serviceOffers.get(typeOffers.get!),
        queryKey: typeOffers.keys,
        enabled: !!type,
    })

    const items = useMemo(() => {
        return data?.res || []
    }, [data?.res])

    return (
        <ul
            className={cx(
                styles.services,
                ["offer", "request"].includes(type) &&
                    styles.requestsAndProposals,
            )}
        >
            {items.map((item) =>
                type === "all" ? (
                    <GeneralServiceAllItem key={`${item.id}-all`} {...item} />
                ) : (
                    <CardRequestsAndProposals
                        key={`${item.id}-offer-${item.provider}`}
                        {...item}
                        type={type === "offer" ? "optional-3" : "optional-2"}
                    />
                ),
            )}
        </ul>
    )
})
