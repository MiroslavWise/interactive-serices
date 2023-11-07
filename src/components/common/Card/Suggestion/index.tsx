"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TCardSuggestion } from "./types"

import { Header } from "./components/Header"
import { Buttons } from "./components/Buttons"
import { MotionLI } from "@/components/common/Motion"
import { serviceTestimonials } from "@/services/testimonials"
import { ContainerPhotos } from "./components/ContainerPhotos"

import styles from "./style.module.scss"

export const CardSuggestion: TCardSuggestion = (props) => {
    const { images, profile, categoryId, title, id, refetch, provider } = props

    const { data: dataTestimonials } = useQuery({
        queryFn: () =>
            serviceTestimonials.get({ provider: "offer", target: id }),
        queryKey: ["testimonials", `offer=${id}`, `provider=offer`],
        enabled: !!id,
    })

    const rating = useMemo(() => {
        if (!dataTestimonials?.res || !dataTestimonials?.res?.length) {
            return null
        }

        let quantity = 0
        let summer: number = 0

        for (const item of dataTestimonials?.res) {
            if (item.rating) {
                quantity++
                summer += +item.rating
            }
        }

        return {
            total: quantity,
            average: summer / quantity,
        }
    }, [dataTestimonials?.res])

    return (
        <MotionLI
            classNames={[styles.container]}
            data={{
                "data-mobile": isMobile,
            }}
        >
            <Header
                categoryId={categoryId!}
                rating={rating}
                title={title}
                provider={provider}
            />
            {images?.length ? (
                <ContainerPhotos
                    {...{
                        photos: images.map((item) => ({
                            url: item?.attributes?.url,
                            id: item?.id,
                        })),
                    }}
                />
            ) : null}
            <Buttons id={id} refetch={refetch} provider={provider} />
        </MotionLI>
    )
}
