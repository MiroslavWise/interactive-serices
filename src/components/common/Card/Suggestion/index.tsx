"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TCardSuggestion } from "./types"

import { Header } from "./components/Header"
import { Buttons } from "./components/Buttons"
import { serviceTestimonials } from "@/services/testimonials"
import { ContainerPhotos } from "./components/ContainerPhotos"

import styles from "./style.module.scss"

export const CardSuggestion: TCardSuggestion = (props) => {
    const { refetch, ...rest } = props

    const { data: dataTestimonials } = useQuery({
        queryFn: () => serviceTestimonials.get({ provider: "offer", target: rest?.id }),
        queryKey: ["testimonials", { targetId: rest?.id, provider: "offer" }],
        enabled: !!rest?.id,
    })

    const rating = useMemo(() => {
        if (!dataTestimonials?.res || !dataTestimonials?.res?.length) {
            return null
        }

        let quantity = 0
        let summer: number = 0

        for (const item of dataTestimonials?.res) {
            if (item?.rating) {
                quantity++
                summer += +item?.rating
            }
        }

        return {
            total: quantity,
            average: summer / quantity,
        }
    }, [dataTestimonials?.res])

    return (
        <li className={styles.container}>
            <Header data={{ ...rest }} rating={rating} />
            {rest?.images?.length ? (
                <ContainerPhotos
                    {...{
                        photos: rest?.images?.map((item) => ({
                            url: item?.attributes?.url,
                            id: item?.id,
                        })),
                    }}
                />
            ) : null}
            <Buttons refetch={refetch} offer={{ ...rest }} />
        </li>
    )
}
