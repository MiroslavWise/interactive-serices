"use client"

import { type ReactNode, useMemo, useState, useEffect } from "react"

import type { ISegmentValues } from "@/components/common/Segments/types"

import { MotionLI } from "@/components/common/Motion"
import { Segments } from "@/components/common/Segments"
import { ItemsReviews } from "../StatisticAndFeedback/components/ItemsReviews"
import { ContainerServices } from "../StatisticAndFeedback/components/ContainerServices"
import { ItemsBlogMessages } from "../StatisticAndFeedback/components/ItemsBlogMessages"

import { cx } from "@/lib/cx"
import { ITEMS_INTERACTIVE } from "../StatisticAndFeedback/components/constants"

import styles from "./style.module.scss"

export const MobileInteractive = () => {
    const [active, setActive] = useState<ISegmentValues<string>>(
        ITEMS_INTERACTIVE[0],
    )
    const [isSticky, setIsSticky] = useState(false)

    const Items: ReactNode = useMemo(() => {
        return {
            reviews: <ItemsReviews />,
            services: <ContainerServices />,
            blogs: <ItemsBlogMessages />,
        }[active.value]
    }, [active.value])

    useEffect(() => {
        const userIdElement = document.getElementById("user-id")
        const liContainer = document.getElementById("li-container")
        const handleScroll = () => {
            if (liContainer) {
                const offset = liContainer.getBoundingClientRect().top
                console.log({ offset })
                setIsSticky(offset <= 25)
            }
        }

        userIdElement?.addEventListener("scroll", handleScroll)

        return () => userIdElement?.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <MotionLI classNames={[styles.containerInteractive]}>
            <Segments
                values={ITEMS_INTERACTIVE}
                active={active}
                setActive={setActive}
                type="optional-1"
                classNames={cx(styles.segments, isSticky && styles.sticky)}
                id="li-container"
            />
            {Items}
        </MotionLI>
    )
}
