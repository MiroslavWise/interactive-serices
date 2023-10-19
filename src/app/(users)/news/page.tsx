"use client"

import { useMemo } from "react"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { Glasses } from "@/components/layout"
import { MotionUL } from "@/components/common/Motion"
import { GeneralServiceAllItem } from "@/components/common/Card"

import { serviceOffers } from "@/services/offers"

import styles from "./style.module.scss"

export default function News() {
    const { data } = useQuery({
        queryKey: ["offers"],
        queryFn: () => serviceOffers.get({ order: "DESC" }),
        enabled: isMobile,
    })

    const items = useMemo(() => {
        if (data?.res && Array.isArray(data?.res) && data?.res?.length === 0) {
            return "Странно, но на вашей геолокации нет каких либо событий или предложений"
        }
        return data?.res || null
    }, [data?.res])

    return isMobile ? (
        <div className={styles.wrapper}>
            <header>
                <p>Популярное рядом</p>
                <div data-total>{items?.length || 0}</div>
            </header>
            <article>
                <MotionUL>
                    {typeof items === "string" ? (
                        <h3>{items}</h3>
                    ) : items?.length ? (
                        items?.map((item) => (
                            <GeneralServiceAllItem
                                key={`${item.id}-offers`}
                                {...item}
                            />
                        ))
                    ) : null}
                </MotionUL>
            </article>
            <Glasses />
        </div>
    ) : null
}
