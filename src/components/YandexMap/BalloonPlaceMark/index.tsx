"use client"

import Image from "next/image"
import { useMemo, useRef } from "react"

import type { TBalloonPlaceMark } from "./types/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { OfferBalloonComponent } from "./components/OfferBalloonComponent"
import { DiscussionBalloonComponent } from "./components/DiscussionBalloonComponent"
import { AlertBalloonComponent } from "./components/AlertBalloonComponent"
import { RequestBalloonComponent } from "./components/RequestBalloonComponent"

import { cx } from "@/lib/cx"

import styles from "./styles/styles.module.scss"

const BalloonPlaceMark: TBalloonPlaceMark = ({ stateBalloon, dispatch }) => {
    const refSection = useRef<HTMLElement>(null)

    const typeContent = useMemo(() => {
        if (!stateBalloon.type) {
            return null
        }
        const objType: Partial<Record<TTypeProvider, any>> = {
            offer: <OfferBalloonComponent stateBalloon={stateBalloon} />,
            discussion: <DiscussionBalloonComponent stateBalloon={stateBalloon} />,
            alert: <AlertBalloonComponent stateBalloon={stateBalloon} />,
            request: <RequestBalloonComponent stateBalloon={stateBalloon} />,
        }

        if (stateBalloon.id) {
            return objType[stateBalloon.type as TTypeProvider]
        }

        return null
    }, [stateBalloon])

    return (
        <div
            className={cx(
                styles.wrapper,
                stateBalloon.visible && styles.active,
            )}
            onClick={(e) => {
                e.stopPropagation()
                dispatch({ visible: false })
            }}
        >
            <section
                data-type-offers={stateBalloon.type || null}
                onClick={(event) => {
                    event.stopPropagation()
                }}
                ref={refSection}
            >
                <Image
                    src="/svg/x-close-white.svg"
                    alt="x-close-white"
                    width={24}
                    height={24}
                    data-img-close
                    onClick={() => {
                        dispatch({ visible: false })
                    }}
                />
                {typeContent}
            </section>
        </div>
    )
}

export default BalloonPlaceMark
