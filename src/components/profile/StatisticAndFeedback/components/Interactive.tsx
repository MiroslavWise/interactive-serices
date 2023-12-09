"use client"

import { useTheme } from "next-themes"
import { useState, useMemo, type ReactNode } from "react"

import type { TInteractive } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"

import { ItemsReviews } from "./ItemsReviews"
import { ContainerServices } from "./ContainerServices"
// import { ItemsBlogMessages } from "./ItemsBlogMessages"

import { ITEMS_INTERACTIVE } from "./constants"

import styles from "./styles/style.module.scss"

export const Interactive: TInteractive = ({}) => {
    const { systemTheme } = useTheme()
    const [active, setActive] = useState<ISegmentValues<string>>(ITEMS_INTERACTIVE[0])

    const Items: ReactNode = useMemo(() => {
        return {
            reviews: <ItemsReviews />,
            services: <ContainerServices />,
        }[active.value]
    }, [active])

    return (
        <section className={styles.interactive}>
            <nav>
                <Segments
                    classNames={styles.segments}
                    type={systemTheme === "dark" ? "primary" : "optional-1"}
                    VALUES={ITEMS_INTERACTIVE}
                    active={active}
                    setActive={setActive}
                />
            </nav>
            {Items}
        </section>
    )
}
