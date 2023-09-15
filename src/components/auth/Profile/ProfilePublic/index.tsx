"use client"

import { isMobile, isTablet } from "react-device-detect"
import { type ReactNode, useMemo, useState } from "react"

import type { TProfilePublic } from "./types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Dots } from "./components/Dots"
import { Glasses } from "./components/Glasses"
import { ItemsBadges } from "./components/ItemsBadges"
import { ItemSegments } from "./components/ItemSegments"
import { ContainerBlogs } from "./components/ContainerBlogs"
import { ButtonClose } from "@/components/common/Buttons"
import { ContainerOffers } from "./components/ContainerOffers"
import { ContainerReviews } from "./components/ContainerReviews"
import { InfoContainerProfile } from "./components/InfoContainerProfile"

import { cx } from "@/lib/cx"
import { VALUES } from "./constants"

import styles from "./styles/style.module.scss"

export const ProfilePublic: TProfilePublic = ({ active, setActive }) => {
    const [activeSegment, setActiveSegment] = useState<ISegmentValues>(
        VALUES[0],
    )

    const content: ReactNode = useMemo(
        () =>
            ({
                reviews: <ContainerReviews />,
                services: <ContainerOffers />,
                blogs: <ContainerBlogs />,
            })[activeSegment.value],
        [activeSegment],
    )

    return !isMobile || isTablet ? (
        <div className={cx(styles.wrapper, active.isProfile && styles.active)}>
            <div
                className={cx(
                    styles.container,
                    active.isProfile && styles.active,
                )}
            >
                <ul className={cx(styles.content)} id="profile-public-id">
                    <InfoContainerProfile profile={active.dataProfile!} />
                    <ItemsBadges />
                    <ItemSegments
                        values={VALUES}
                        activeSegment={activeSegment}
                        setActiveSegment={setActiveSegment}
                    />
                    {content}
                </ul>
                <ButtonClose
                    position={{
                        top: 12,
                        left: 12,
                    }}
                    onClick={() =>
                        setActive((data) => ({
                            isProfile: false,
                            isService: true,
                            dataProfile: data.dataProfile,
                        }))
                    }
                />
                <Dots id={active.dataProfile?.userId!} />
                <Glasses />
            </div>
        </div>
    ) : null
}
