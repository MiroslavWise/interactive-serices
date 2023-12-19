"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { isMobile } from "react-device-detect"

import { GeneralServiceAllItem } from "@/components/common/Card"

import { useBounds } from "@/store/hooks"
import { serviceOffers } from "@/services/offers"

export default function News() {
    const bounds = useBounds(({ bounds }) => bounds)
    const { data } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffers.get({ order: "DESC" }),
        enabled: isMobile,
    })

    const items = useMemo(() => {
        if (data?.res && Array.isArray(data?.res) && data?.res?.length === 0) {
            return "Странно, но на вашей геолокации нет каких либо событий или предложений"
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

        return data?.res || null
    }, [data?.res, bounds])

    return isMobile ? (
        <div className="page-news-page">
            <header>
                <p>Популярное рядом</p>
                <div data-total>{items?.length || 0}</div>
            </header>
            <article>
                <ul>
                    {typeof items === "string" ? (
                        <h3>{items}</h3>
                    ) : items?.length ? (
                        items?.map((item) => <GeneralServiceAllItem key={`${item.id}-offers`} {...item} />)
                    ) : null}
                </ul>
            </article>
        </div>
    ) : null
}
