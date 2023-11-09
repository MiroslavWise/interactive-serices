"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useMemo, useRef, memo } from "react"

import type { TBalloonPlaceMark } from "./types/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { cx } from "@/lib/cx"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { OfferBalloonComponent } from "./components/OfferBalloonComponent"
import { DiscussionBalloonComponent } from "./components/DiscussionBalloonComponent"
import { AlertBalloonComponent } from "./components/AlertBalloonComponent"
import { RequestBalloonComponent } from "./components/RequestBalloonComponent"

const BalloonPlaceMark: TBalloonPlaceMark = ({}) => {
    const refSection = useRef<HTMLElement>(null)
    const { visible, id, idUser, type, dispatch } = useBalloonCard()

    const typeContent = useMemo(() => {
        if (!type) {
            return null
        }
        const objType: Partial<Record<TTypeProvider, any>> = {
            offer: (
                <OfferBalloonComponent
                    stateBalloon={{ visible, type, id, idUser }}
                />
            ),
            discussion: (
                <DiscussionBalloonComponent
                    stateBalloon={{ visible, type, id, idUser }}
                />
            ),
            alert: (
                <AlertBalloonComponent
                    stateBalloon={{ visible, type, id, idUser }}
                />
            ),
            request: (
                <RequestBalloonComponent
                    stateBalloon={{ visible, type, id, idUser }}
                />
            ),
        }

        if (id) {
            return objType[type as TTypeProvider]
        }

        return null
    }, [type, id, idUser, visible])

    return visible ? (
        <div
            className={cx("wrapper-fixed", "modal-balloon-modal")}
            data-visible={visible}
            onClick={(e) => {
                e.stopPropagation()
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
                />
                {typeContent}
            </section>
        </div>
    ) : null
}

export default memo(BalloonPlaceMark)
