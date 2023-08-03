import { type ReactNode, useMemo, useState } from "react"
import Image from "next/image"

import type { TProfilePublic } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { InfoContainerProfile } from "./components/InfoContainerProfile"
import { ItemsBadges } from "./components/ItemsBadges"
import { ItemSegments } from "./components/ItemSegments"
import { ContainerReviews } from "./components/ContainerReviews"
import { ContainerOffers } from "./components/ContainerOffers"
import { ContainerBlogs } from "./components/ContainerBlogs"
import { Dots } from "./components/Dots"
import { Glasses } from "./components/Glasses"

import { VALUES } from "./constants"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { ButtonClose } from "@/components/common/Buttons"

const ProfilePublic: TProfilePublic = ({ active, setActive }) => {
  const [activeSegment, setActiveSegment] = useState<ISegmentValues>(VALUES[0])

  const content: ReactNode = useMemo(() => ({
    reviews: <ContainerReviews />,
    services: <ContainerOffers />,
    blogs: <ContainerBlogs />,
  }[activeSegment.value]), [activeSegment])

  return (
    <div className={cx(styles.wrapper, active.isProfile && styles.active)}>
      <div className={cx(styles.container, active.isProfile && styles.active)}>
        <InfoContainerProfile profile={active.dataProfile!} />
        <ItemsBadges />
        <ItemSegments
          values={VALUES}
          activeSegment={activeSegment}
          setActiveSegment={setActiveSegment}
        />
        {content}
        <p className={styles.title}>Public profile</p>
        <ButtonClose
          position={{
            top: 12,
            left: 12,
          }}
          onClick={() => setActive((data) => ({ isProfile: false, isService: true, dataProfile: data.dataProfile }))}
        />
        <Dots id={active.dataProfile?.userId!} />
        <Glasses />
      </div>
    </div>
  )
}

export default ProfilePublic