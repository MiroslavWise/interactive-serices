"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TTypeSegment } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Content } from "./components/Content"
import { BlockDots } from "./components/BlockDots"
import { ButtonClose } from "@/components/common"
import { ItemsBadges } from "./components/ItemsBadges"
import { ItemSegments } from "./components/ItemSegments"
import { InfoContainerProfile } from "./components/InfoContainerProfile"

import { cx } from "@/lib/cx"
import { getUserId } from "@/services"
import { VALUES } from "./constants/SEGMENTS"
import { dispatchProfilePublic, useProfilePublic } from "@/store"

import styles from "./styles/style.module.scss"

export const PublicProfile = () => {
  const isLeft = useProfilePublic(({ isLeft }) => isLeft)
  const idUser = useProfilePublic(({ idUser }) => idUser)
  const visibleProfilePublic = useProfilePublic(({ visibleProfilePublic }) => visibleProfilePublic)
  const [activeSegment, setActiveSegment] = useState<ISegmentValues<TTypeSegment>>(VALUES[0])

  const { data } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["user", { userId: idUser }],
    enabled: visibleProfilePublic && !!idUser,
  })

  function handleClose() {
    dispatchProfilePublic({ visible: false })
  }

  return visibleProfilePublic ? (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleProfilePublic} data-left={isLeft}>
      <section>
        <ButtonClose
          onClick={handleClose}
          position={{
            top: 12,
            left: 12,
          }}
        />
        <BlockDots id={idUser!} />
        <ul data-opacity={!!data?.res} id="profile-public-id">
          <InfoContainerProfile {...data?.res!} />
          <ItemsBadges {...data?.res!} />
          <ItemSegments {...{ activeSegment, setActiveSegment }} />
          <Content {...data?.res!} type={activeSegment.value} />
        </ul>
      </section>
    </div>
  ) : null
}
