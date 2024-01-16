"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TTypeSegment } from "./types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Content } from "./components/Content"
import { BlockDots } from "./components/BlockDots"
import { ItemsBadges } from "./components/ItemsBadges"
import { ItemSegments } from "./components/ItemSegments"
import { ButtonClose } from "@/components/common/Buttons"
import { InfoContainerProfile } from "./components/InfoContainerProfile"

import { cx } from "@/lib/cx"
import { serviceUsers } from "@/services/users"
import { VALUES } from "./constants/SEGMENTS"
import { dispatchProfilePublic, useProfilePublic } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const PublicProfile = () => {
    const isLeft = useProfilePublic(({ isLeft }) => isLeft)
    const idUser = useProfilePublic(({ idUser }) => idUser)
    const visibleProfilePublic = useProfilePublic(({ visibleProfilePublic }) => visibleProfilePublic)
    const [activeSegment, setActiveSegment] = useState<ISegmentValues<TTypeSegment>>(VALUES[0])

    const { data } = useQuery({
        queryFn: () => serviceUsers.getId(idUser!),
        queryKey: ["user", idUser!],
        enabled: visibleProfilePublic && !!idUser,
    })

    function handleClose() {
        dispatchProfilePublic({ visible: false })
    }

    return visibleProfilePublic ? (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleProfilePublic} data-left={isLeft}>
            <section>
                <ButtonClose onClick={handleClose} position={{}} />
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
