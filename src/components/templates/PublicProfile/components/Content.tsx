"use client"

import { memo, useMemo } from "react"

import type { TContent } from "../types/types"

import { ContainerReviews } from "./ContainerReviews"
import { ContainerServices } from "./ContainerServices"

export const Content: TContent = memo(function Content(props) {
    const { id, type } = props ?? {}

    const content = useMemo(() => {
        return {
            reviews: <ContainerReviews />,
            services: <ContainerServices />,
        }[type]
    }, [type])

    return <section data-content>{content}</section>
})
