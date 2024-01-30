"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TServicesFC } from "../types/types"

import { ServiceLoading } from "@/components/common"
import { GeneralServiceAllItem } from "@/components/common/Card"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services"
import { useBounds, useFilterMap } from "@/store"

import styles from "../styles/style.module.scss"

export const ServicesComponent: TServicesFC = memo(function $ServicesComponent() {
    const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)
    const bounds = useBounds(({ bounds }) => bounds)
    const obj = idsNumber.length ? { category: idsNumber.join(",") } : {}

    const { data, isLoading } = useQuery({
        queryFn: () => serviceOffers.get({ order: "DESC", ...obj }),
        queryKey: ["offers", `category=${idsNumber.join(":")}`],
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
                const coordinates = item?.addresses[0]?.coordinates?.split(" ").reverse().map(Number).filter(Boolean)
                if (!coordinates) {
                    return false
                }

                if (coordinates[0] < maxCoors[0] && coordinates[0] > minCoords[0] && coordinates[1] < maxCoors[1] && coordinates[1] > minCoords[1]) {
                    return true
                }

                return false
            })
        }

        return data?.res || []
    }, [data?.res, bounds])

    return (
        <ul className={cx(styles.services)}>
            {isLoading
                ? [1, 2, 3].map((item) => <ServiceLoading key={`::item::loading::offers::${item}`} />)
                : items.map((item) => <GeneralServiceAllItem key={`::${item.id}::all::`} {...item} />)}
        </ul>
    )
})
