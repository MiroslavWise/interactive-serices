"use client"

import { useMemo } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useSwipeable } from "react-swipeable"

import type { TPhotoPreviewModal } from "./types/types"
import type { IResponseOffers } from "@/services/offers/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { NextImageMotion } from "@/components/common/Image"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { daysAgo, usePush } from "@/helpers"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useProfilePublic } from "@/store/state/useProfilePublic"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"

import styles from "./styles/layout.module.scss"

export const PhotoPreviewModal: TPhotoPreviewModal = ({}) => {
    const { current, photos, dispatchPhotoOffer, visible, author, offer } =
        usePhotoOffer()
    const { dispatchVisibleBarter } = useVisibleModalBarter()
    const { dispatchMapCoordinates } = useMapCoordinates()
    const { dispatch: dispatchBalloon } = useBalloonCard()
    const { dispatchProfilePublic } = useProfilePublic()
    const { userId } = useAuth()
    const { handlePush } = usePush()

    const widthCarousel: number = useMemo(() => {
        return photos.length * 90 + photos.length * 13 - 13 + 40 || 0
    }, [photos])

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
    })

    function handleClickUser() {
        if (isMobile) {
            handlePush(`/user?id=${author?.idUser!}`)
            dispatchPhotoOffer({ visible: false })
        } else {
            dispatchProfilePublic({
                visible: true,
                idUser: author?.idUser!,
            })
        }
    }

    function handlePrev() {
        console.log("handlePrev: ")
        if (current?.index === 0) {
            dispatchPhotoOffer({ current: photos.at(-1) })
        } else {
            dispatchPhotoOffer({ payload: "prev" })
        }
    }

    function handleNext() {
        console.log("handleNext")
        if (current?.index === photos?.length - 1) {
            dispatchPhotoOffer({ current: photos[0] })
        } else {
            dispatchPhotoOffer({ payload: "next" })
        }
    }

    function handleOpenBarter() {
        const dataProfile = {
            photo: author?.urlPhoto!,
            fullName: author?.name!,
            idUser: author?.idUser!,
        }

        const dataOffer: IResponseOffers = offer!
        if (userId) {
            dispatchVisibleBarter({
                isVisible: true,
                dataProfile: dataProfile,
                dataOffer: dataOffer,
            })
        }
    }

    function handleHelp() {
        if (author?.idUser === userId) {
            return
        }
        if (userId) {
            dispatchBalloon({ visible: false })
            handlePush(`/messages?user=${author?.idUser!}`)
        }
    }

    const geo =
        (offer?.addresses && offer?.addresses?.length && offer?.addresses[0]) ||
        null

    function handleGeo() {
        if (geo) {
            dispatchBalloon({ visible: false })
            dispatchMapCoordinates({
                coordinates: geo?.coordinates
                    ?.split(" ")
                    ?.reverse()
                    ?.map(Number),
            })
        }
    }

    console.log("offer: ", offer)
    console.log("geo: ", geo)

    return visible ? (
        <main
            className={cx("wrapper-fixed", styles.wrapper)}
            data-mobile={isMobile}
            data-visible={visible}
        >
            <section {...handlers}>
                <div data-dark-header />
                <div
                    data-close
                    onClick={() => {
                        dispatchPhotoOffer({ visible: false, photos: null })
                    }}
                >
                    <Image
                        src="/svg/x-close.svg"
                        alt="x-close"
                        width={16}
                        height={16}
                    />
                </div>
                <div data-left onClick={handlePrev}>
                    <Image
                        src="/svg/arrow-left.svg"
                        alt="arrow-left"
                        width={20}
                        height={20}
                    />
                </div>
                <div data-right onClick={handleNext}>
                    <Image
                        src="/svg/arrow-right.svg"
                        alt="arrow-right"
                        width={20}
                        height={20}
                    />
                </div>
                <header>
                    <div data-title>
                        <div data-author onClick={handleClickUser}>
                            <NextImageMotion
                                src={author?.urlPhoto!}
                                alt="avatar"
                                width={400}
                                height={400}
                                onClick={handleClickUser}
                            />
                            <div data-title-name-geo>
                                <h2>{author?.name}</h2>
                                {geo ? (
                                    <GeoTagging
                                        location={geo?.additional!}
                                        fontSize={12}
                                        size={14}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <p>{daysAgo(author?.time!)}</p>
                    </div>
                    <h3>{author?.title!}</h3>
                </header>
                {current ? (
                    <NextImageMotion
                        src={current?.url}
                        alt="offer-image"
                        width={800}
                        height={800}
                    />
                ) : null}
                <div data-images>
                    <ul style={{ width: widthCarousel }}>
                        {photos
                            ? photos.map((item, index) => (
                                  <li
                                      key={item.id + item.url}
                                      data-active={index === current?.index}
                                      onClick={() => {
                                          dispatchPhotoOffer({
                                              current: item,
                                          })
                                      }}
                                  >
                                      <NextImageMotion
                                          src={item?.url}
                                          alt="offer-image"
                                          width={800}
                                          height={800}
                                      />
                                  </li>
                              ))
                            : null}
                    </ul>
                </div>
                <footer>
                    <ButtonDefault
                        label="Подробнее"
                        handleClick={handleClickUser}
                    />
                    {["offer"].includes(offer?.provider!) ? (
                        <ButtonFill
                            label="Откликнуться на обмен"
                            handleClick={handleOpenBarter}
                            suffix={
                                <Image
                                    src="/svg/repeat-black.svg"
                                    alt="/repeat-black"
                                    width={24}
                                    height={24}
                                />
                            }
                            type="primary"
                        />
                    ) : null}
                    {["alert"]?.includes(offer?.provider!) ? (
                        <button
                            data-success
                            onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                handleHelp()
                            }}
                        >
                            <span>Могу помочь!</span>
                        </button>
                    ) : null}
                </footer>
            </section>
        </main>
    ) : null
}
