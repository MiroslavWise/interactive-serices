"use client"

import Image from "next/image"
import { ReactNode, useRef } from "react"
import { isMobile } from "react-device-detect"

import type { TBalloonPlaceMark } from "./types/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { AlertBalloonComponent } from "./components/AlertBalloonComponent"
import { OfferBalloonComponent } from "./components/OfferBalloonComponent"
import { RequestBalloonComponent } from "./components/RequestBalloonComponent"
import { DiscussionBalloonComponent } from "./components/DiscussionBalloonComponent"

import { cx } from "@/lib/cx"
import { useBalloonCard } from "@/store/state/useBalloonCard"

export const BalloonPlaceMark: TBalloonPlaceMark = ({}) => {
    const refSection = useRef<HTMLElement>(null)
    const type = useBalloonCard(({ type }) => type)
    const visible = useBalloonCard(({ visible }) => visible)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const typeContent: Partial<Record<TTypeProvider, ReactNode>> = {
        offer: <OfferBalloonComponent />,
        discussion: <DiscussionBalloonComponent />,
        alert: <AlertBalloonComponent />,
        request: <RequestBalloonComponent />,
    }

    return (
        <div
            className={cx("wrapper-fixed", "modal-balloon-modal")}
            data-visible={visible}
            onClick={(e) => {
                dispatch({ visible: false })
            }}
            data-mobile={isMobile}
        >
            <section
                data-type-offers={type || null}
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
                    data-visible={!visible}
                    onClick={() => {
                        dispatch({ visible: false })
                    }}
                    unoptimized
                />
                {typeContent.hasOwnProperty(type!) ? typeContent[type!] : null}
            </section>
        </div>
    )
}
