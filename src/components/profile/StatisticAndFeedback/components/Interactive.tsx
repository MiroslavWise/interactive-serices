"use client"

import { useTheme } from "next-themes"
import { useState, useMemo, type ReactNode } from "react"

import type { TInteractive } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"

import { ItemsReviews } from "./ItemsReviews"
import { ContainerServices } from "./ContainerServices"
import { ItemsBlogMessages } from "./ItemsBlogMessages"

import { VALUES } from "@/components/auth/Profile/ProfilePublic/constants"

import styles from "./styles/style.module.scss"

export const Interactive: TInteractive = ({}) => {
    const [active, setActive] = useState<ISegmentValues<string>>(VALUES[0])
    const { systemTheme } = useTheme()

    const Items: ReactNode = useMemo(() => {
        return {
            reviews: <ItemsReviews />,
            services: <ContainerServices />,
            blogs: <ItemsBlogMessages />,
        }[active.value]
    }, [active])

    return (
        <section className={styles.interactive}>
            <nav>
                <Segments
                    classNames={styles.segments}
                    type={systemTheme === "dark" ? "primary" : "optional-1"}
                    values={VALUES}
                    active={active}
                    setActive={setActive}
                />
            </nav>
            {Items}
        </section>
    )
}
