"use client"

import { useMemo } from "react"
import Image from "next/image"

import type { TPhotoPreviewModal } from "./types/types"

import { GeoTagging } from "@/components/common/GeoTagging"
import { NextImageMotion } from "@/components/common/Image"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { daysAgo, usePush } from "@/helpers"
import { usePhotoOffer } from "@/store/state/usePhotoOffer"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"

import styles from "./styles/layout.module.scss"
import { IResponseOffers } from "@/services/offers/types"

const PhotoPreviewModal: TPhotoPreviewModal = ({}) => {
    const { current, photos, dispatch, visible, author, offer } =
        usePhotoOffer()
    const { dispatchVisibleBarter } = useVisibleModalBarter()
    const { dispatchMapCoordinates } = useMapCoordinates()
    const { userId } = useAuth()
    const { handlePush } = usePush()

    const widthCarousel: number = useMemo(() => {
        return photos.length * 90 + photos.length * 13 - 13 + 40 || 0
    }, [photos])

    function handleClickUser() {
        handlePush(`/user?id=${author?.idUser!}`)
        dispatch({ visible: false, photos: null })
    }

    function handlePrev() {
        dispatch({ payload: "prev" })
    }

    function handleNext() {
        dispatch({ payload: "next" })
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
            handlePush(`/messages?user=${author?.idUser!}`)
        }
    }

    function handleGeo() {
        dispatchMapCoordinates({
            coordinates: offer?.addresses?.[0]?.coordinates
                ?.split(" ")
                ?.reverse()
                ?.map(Number),
            zoom: 20,
        })
    }

    return (
        <main className={cx(styles.wrapper, visible && styles.active)}>
            <section>
                <div data-dark-header />
                <div
                    data-close
                    onClick={() => {
                        dispatch({ visible: false, photos: null })
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
                                {offer?.addresses[0]?.additional ? (
                                    <GeoTagging
                                        location={
                                            offer?.addresses[0]?.additional ||
                                            ""
                                        }
                                        fontSize={12}
                                        size={14}
                                        onClick={handleGeo}
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
                                  >
                                      <NextImageMotion
                                          onClick={() => {
                                              dispatch({
                                                  current: item,
                                              })
                                          }}
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
                            label="Откликнуться на бартер"
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
    )
}

export default PhotoPreviewModal
