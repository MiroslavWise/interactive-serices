import { type ReactNode, useMemo, useState } from "react"

import type { ISegmentValues } from "@/components/common/Segments/types"

import { MotionLI } from "@/components/common/Motion"
import { Segments } from "@/components/common/Segments"
import { ITEMS_INTERACTIVE } from "../StatisticAndFeedback/components/constants"
import { cx } from "@/lib/cx"

import styles from "./style.module.scss"
import { ItemsReviews } from "../StatisticAndFeedback/components/ItemsReviews"
import { ItemsBlogMessages } from "../StatisticAndFeedback/components/ItemsBlogMessages"
import { ContainerServices } from "../StatisticAndFeedback/components/ContainerServices"

export const MobileInteractive = () => {
  const [active, setActive] = useState<ISegmentValues>(ITEMS_INTERACTIVE[0])

  const Items: ReactNode = useMemo(() => {
    return {
      reviews: <ItemsReviews />,
      services: <ContainerServices />,
      blogs: <ItemsBlogMessages />,
    }[active.value]
  }, [active.value])


  return (
    <MotionLI classNames={[styles.containerInteractive]}>
      <Segments
        values={ITEMS_INTERACTIVE}
        active={active}
        setActive={setActive}
        type="optional-1"
        classNames={cx(styles.segments)}
      />
      {Items}
    </MotionLI>
  )
}