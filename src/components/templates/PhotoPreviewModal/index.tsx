"use client"

import Link from "next/link"
import { SyntheticEvent, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useSwipeable } from "react-swipeable"

import type { TPhotoPreviewModal } from "./types/types"
import type { IResponseOffers } from "@/services/offers/types"

import { ButtonCanHelp } from "@/components/common/custom"
import { Button, GeoTagging, NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { useAuth, useVisibleModalBarter, useProfilePublic, usePhotoOffer, useOffersCategories } from "@/store/hooks"

import styles from "./styles/layout.module.scss"

export const PhotoPreviewModal: TPhotoPreviewModal = ({}) => {
    const current = usePhotoOffer(({ current }) => current)
    const photos = usePhotoOffer(({ photos }) => photos)
    const dispatchPhotoOffer = usePhotoOffer(({ dispatchPhotoOffer }) => dispatchPhotoOffer)
    const visible = usePhotoOffer(({ visible }) => visible)
    const author = usePhotoOffer(({ author }) => author)
    const offer = usePhotoOffer(({ offer }) => offer)
    const dispatchVisibleBarter = useVisibleModalBarter(({ dispatchVisibleBarter }) => dispatchVisibleBarter)
    const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)
    const userId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)

    const widthCarousel: number = useMemo(() => {
        return photos.length * 90 + photos.length * 13 - 13 + 40 || 0
    }, [photos])

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
    })

    function handlePrev() {
        if (current?.index === 0) {
            dispatchPhotoOffer({ current: photos.at(-1) })
        } else {
            dispatchPhotoOffer({ payload: "prev" })
        }
    }

    function handleNext() {
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

    const geo = (offer?.addresses && offer?.addresses?.length && offer?.addresses[0]) || null
    const categoriesUser = useMemo(
        () => (offer?.provider === "offer" ? categories?.filter((item) => offer?.categories?.some((_) => item.id === _)) || [] : []),
        [categories, offer?.categories, offer?.provider],
    )

    return (
        <main className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
            {visible ? (
                <>
                    <section {...handlers}>
                        <div data-dark-header />
                        <div
                            data-close
                            onClick={() => {
                                dispatchPhotoOffer({ visible: false, photos: null })
                            }}
                        >
                            <img src="/svg/x-close.svg" alt="x-close" width={16} height={16} />
                        </div>
                        <div data-left onClick={handlePrev}>
                            <img src="/svg/arrow-left.svg" alt="arrow-left" width={20} height={20} />
                        </div>
                        <div data-right onClick={handleNext}>
                            <img src="/svg/arrow-right.svg" alt="arrow-right" width={20} height={20} />
                        </div>
                        <header>
                            <div data-title>
                                <Link
                                    data-author
                                    href={isMobile ? { pathname: "/user", query: { id: author?.idUser! } } : {}}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        if (!isMobile) {
                                            dispatchProfilePublic({
                                                visible: true,
                                                idUser: author?.idUser!,
                                            })
                                        }
                                    }}
                                >
                                    <NextImageMotion src={author?.urlPhoto!} alt="avatar" width={60} height={60} />
                                    <div data-title-name-geo>
                                        <h2>{author?.name}</h2>
                                        {geo ? <GeoTagging location={geo?.additional!} fontSize={12} size={14} /> : null}
                                    </div>
                                </Link>
                                <time dateTime={`${offer?.updated}`}>{daysAgo(offer?.updated!)}</time>
                            </div>
                            <h3>
                                <span>Могу: </span>
                                {offer?.title!}
                            </h3>
                            {categoriesUser.length && offer?.provider === "offer" ? (
                                <article data-article-want>
                                    <p>Хочу:</p>
                                    {categoriesUser.map((item) => (
                                        <div key={`::${item.id}::category::user::`} data-item>
                                            <img
                                                src={`/svg/category/${item.id}.svg`}
                                                alt={`${item.id!}`}
                                                width={28}
                                                height={28}
                                                onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                                                    if (error?.target) {
                                                        try {
                                                            //@ts-ignore
                                                            error.target.src = `/svg/category/default.svg`
                                                        } catch (e) {
                                                            console.log("catch e: ", e)
                                                        }
                                                    }
                                                }}
                                            />
                                            <p>{item.title}</p>
                                        </div>
                                    ))}
                                </article>
                            ) : null}
                        </header>
                        {photos?.map((item) => (
                            <NextImageMotion
                                key={`::${item.id}::current::offer::photo`}
                                src={item?.url!}
                                alt="offer-image"
                                width={800}
                                height={800}
                                data-current={current?.id === item?.id}
                            />
                        ))}
                        <div data-images>
                            <ul style={{ width: widthCarousel }}>
                                {photos.length
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
                                              <NextImageMotion src={item?.url} alt="offer-image" width={800} height={800} />
                                          </li>
                                      ))
                                    : null}
                            </ul>
                        </div>
                        <footer>
                            <Link
                                href={isMobile ? { pathname: "/user", query: { id: author?.idUser! } } : {}}
                                onClick={(event) => {
                                    event.stopPropagation()
                                    if (!isMobile) {
                                        dispatchProfilePublic({
                                            visible: true,
                                            idUser: author?.idUser!,
                                        })
                                    }
                                }}
                            >
                                <span>Подробнее</span>
                            </Link>
                            {["offer"].includes(offer?.provider!) ? (
                                <Button
                                    type="button"
                                    typeButton="fill-primary"
                                    label="Откликнуться на обмен"
                                    onClick={handleOpenBarter}
                                    suffixIcon={<img src="/svg/repeat-black.svg" alt="/repeat-black" width={24} height={24} />}
                                />
                            ) : null}
                            {["alert"]?.includes(offer?.provider!) ? <ButtonCanHelp id={offer?.id!} idUser={offer?.userId!} /> : null}
                        </footer>
                    </section>
                </>
            ) : null}
        </main>
    )
}
