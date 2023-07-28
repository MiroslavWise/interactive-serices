import { type ReactNode, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import type { TProfilePublic } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { InfoContainerProfile } from "./components/InfoContainerProfile"
import { ItemsBadges } from "./components/ItemsBadges"
import { ItemSegments } from "./components/ItemSegments"
import { ContainerReviews } from "./components/ContainerReviews"
import { ContainerOffers } from "./components/ContainerOffers"
import { ContainerBlogs } from "./components/ContainerBlogs"

import { VALUES } from "./constants"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { Dots } from "./components/Dots"

const ProfilePublic: TProfilePublic = ({ active, setActive }) => {
  const [activeSegment, setActiveSegment] = useState<ISegmentValues>(VALUES[0])

  const content: ReactNode = useMemo(() => ({
    reviews: <ContainerReviews />,
    services: <ContainerOffers />,
    sos: null,
    blogs: <ContainerBlogs />,
  }[activeSegment.value]), [activeSegment])

  return (
    <div
      id="ProfilePublic"
      className={cx(styles.container, active.isProfile && styles.active)}
    >
      <InfoContainerProfile profile={active.dataProfile!} />
      <ItemsBadges />
      <ItemSegments
        values={VALUES}
        activeSegment={activeSegment}
        setActiveSegment={setActiveSegment}
      />
      {content}
      <p className={styles.title}>Public profile</p>
      <div
        className={styles.close}
        onClick={() => setActive((data) => ({ isProfile: false, isService: true, dataProfile: data.dataProfile }))}
      >
        <Image
          src="/svg/x-close.svg"
          alt="x"
          width={20}
          height={20}
        />
      </div>
      <Dots id={active.dataProfile?.userId!} />
      <span className={styles.glassShadow1} />
      <span className={styles.glassShadow2} />
      <span className={styles.glassShadow3} />
      <span className={styles.glassShadow4} />
      <span className={styles.glassShadow5} />
    </div>
  )
}

export default ProfilePublic