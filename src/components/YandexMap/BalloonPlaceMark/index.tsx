"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { ReactNode, useRef } from "react"

import type { TBalloonPlaceMark } from "./types/types"

import { cx } from "@/lib/cx"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { OfferBalloonComponent } from "./components/OfferBalloonComponent"
import { DiscussionBalloonComponent } from "./components/DiscussionBalloonComponent"
import { AlertBalloonComponent } from "./components/AlertBalloonComponent"
import { RequestBalloonComponent } from "./components/RequestBalloonComponent"
import { TTypeProvider } from "@/services/file-upload/types"

export const BalloonPlaceMark: TBalloonPlaceMark = ({}) => {
    const refSection = useRef<HTMLElement>(null)
    const { visible, type, dispatch } = useBalloonCard()

    const typeContent: Partial<Record<TTypeProvider, ReactNode>> = {
        offer: <OfferBalloonComponent />,
        discussion: <DiscussionBalloonComponent />,
        alert: <AlertBalloonComponent />,
        request: <RequestBalloonComponent />,
    }

    return visible ? (
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
                    event.preventDefault()
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
                />
                {typeContent.hasOwnProperty(type!) ? typeContent[type!] : null}
            </section>
        </div>
    ) : null
}
