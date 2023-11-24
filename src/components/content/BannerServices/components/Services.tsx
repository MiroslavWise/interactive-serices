"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TServicesFC } from "../types/types"
import type { TOrder } from "@/services/types/general"
import type { TTypeProvider } from "@/services/file-upload/types"

import {
    GeneralServiceAllItem,
    CardRequestsAndProposals,
} from "@/components/common/Card"

import { cx } from "@/lib/cx"
import { useBounds, useFilterMap } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"

import styles from "../styles/style.module.scss"

export const ServicesComponent: TServicesFC = memo(function $ServicesComponent({
    setTotal,
    type,
}) {
    const { idTarget } = useFilterMap((_) => ({ idTarget: _.idTarget }))
    const { bounds } = useBounds((_) => ({ bounds: _.bounds }))
    const obj = idTarget ? { category: idTarget } : {}
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
        queryFn: () => serviceOffers.get({ ...typeOffers.get!, ...obj }),
        queryKey: [...typeOffers.keys, `category=${idTarget}`],
        enabled: !!type,
    })

    const items = useMemo(() => {
        if (!data?.res) {
            return []
        }
        if (bounds && data?.res) {
            const minCoords = bounds[0]
            const maxCoors = bounds[1]

            return data?.res?.filter((item) => {
                if (!item?.addresses?.length) {
                    return false
                }
                const coordinates = item?.addresses[0]?.coordinates
                    ?.split(" ")
                    .reverse()
                    .map(Number)
                    .filter(Boolean)
                if (!coordinates) {
                    return false
                }

                if (
                    coordinates[0] < maxCoors[0] &&
                    coordinates[0] > minCoords[0] &&
                    coordinates[1] < maxCoors[1] &&
                    coordinates[1] > minCoords[1]
                ) {
                    return true
                }

                return false
            })
        }

        return data?.res || []
    }, [data?.res, bounds])

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
