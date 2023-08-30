"use client"

import { useState, useMemo, type ReactNode } from "react"
import { useTheme } from "next-themes"

import type { TInteractive } from "./types/types"
import type { TItemInteractive } from "../types/types"

import { Segments } from "@/components/common/Segments"

import { ItemsReviews } from "./ItemsReviews"
import { ItemsBlogMessages } from "./ItemsBlogMessages"
import { ContainerServices } from "./ContainerServices"

import { VALUES } from "@/components/auth/Profile/ProfilePublic/constants"

import styles from "./styles/style.module.scss"
import { ISegmentValues } from "@/components/common/Segments/types"

export const Interactive: TInteractive = ({ }) => {
  const [active, setActive] = useState<ISegmentValues>(VALUES[0])
  const { systemTheme } = useTheme()

  const Items: ReactNode = useMemo(() => {
    return {
      reviews: <ItemsReviews />,
      blogs: <ItemsBlogMessages />,
      services: <ContainerServices />,
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