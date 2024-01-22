"use client"

import { forwardRef, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { IGeneralServiceAllItem } from "./types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { ButtonCanHelp } from "@/components/common/custom"
import { GeoTagging, NextImageMotion } from "@/components/common"
import { AvatarsBalloon } from "@/components/YandexMap/BalloonPlaceMark/components/AvatarsBalloon"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { serviceProfile } from "@/services"
import { IconCategory } from "@/lib/icon-set"
import { usePhotoVisible } from "@/components/YandexMap/BalloonPlaceMark/hooks/usePhotoVisible"
import { dispatchBallonDiscussion, dispatchBallonOffer, useBalloonCard, useMapCoordinates, useOffersCategories, useProfilePublic } from "@/store"

import styles from "./style.module.scss"

export const GeneralServiceAllItem = forwardRef(function GeneralServiceAllItem(props: IGeneralServiceAllItem) {
    const { id, categoryId, provider, title, userId, addresses, className, images, style, categories: categoriesOffer, ref } = props ?? {}
    const { handlePush } = usePush()
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)
    const dispatchMapCoordinates = useMapCoordinates(({ dispatchMapCoordinates }) => dispatchMapCoordinates)
    const { createGallery } = usePhotoVisible()
    const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)
    const { data: dataProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(userId!),
        queryKey: ["profile", userId!],
        enabled: !!userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const typeImagePng: string | null = useMemo(() => {
        let img = "/svg/category/default.svg"

        if (provider === "offer" && categoryId) {
            img = IconCategory(categoryId!)
        }

        const obj: Readonly<Partial<Record<TTypeProvider, any>>> = {
            offer: img,
            discussion: "/map/circle-discussion.png",
            alert: "/map/circle-alert.png",
            request: "/map/circle-offers-default.png",
        }

        return obj[provider] || null
    }, [provider, categoryId])

    const categoryOffer: string | null =
        ["offer"].includes(provider) && categoryId && categories.length ? categories.find((item) => Number(item.id) === Number(categoryId))?.title! : null

    function handle() {
        const [address] = addresses
        handlePush("/")
        requestAnimationFrame(() => {
            dispatchMapCoordinates({
                coordinates: address?.coordinates?.split(" ")?.reverse()?.map(Number),
            })
            if (provider === "offer") {
                const { ref, className, style, ...offer } = props ?? {}
                dispatchBallonOffer({
                    visible: true,
                    offer: offer,
                })
                return
            } else if (provider === "discussion") {
                const { ref, className, style, ...offer } = props ?? {}
                dispatchBallonDiscussion({
                    visible: true,
                    offer: offer,
                })
            } else {
                dispatch({
                    visible: true,
                    id: id,
                    idUser: userId,
                    type: provider || null,
                })
            }
        })
    }

    function handleImages() {
        const { ...data } = props ?? {}
        if (images?.length) {
            createGallery(data, images, images[0], 0, {
                title: data?.title!,
                name: `${dataProfile?.res?.firstName || ""} ${dataProfile?.res?.lastName || ""}`,
                urlPhoto: dataProfile?.res?.image?.attributes?.url!,
                idUser: dataProfile?.res?.id!,
                time: data?.updated!,
            })
        }
    }

    function handleProfile() {
        if (isMobile) {
            handlePush(`/user?id=${userId}`)
        } else {
            dispatchProfilePublic({ visible: true, idUser: userId! })
        }
    }

    const geo = addresses && !!addresses.length && addresses[0]

    const categoriesUser = useMemo(() => {
        return provider === "offer" ? categories?.filter((item) => categoriesOffer?.some((_) => item.id === _)) || [] : []
    }, [categories, categoriesOffer])

    return (
        <li className={cx(styles.container, className)} onClick={handle} style={style} ref={ref}>
            <header data-provider={provider}>
                {typeImagePng ? (
                    <img src={typeImagePng} alt="offer" width={58} height={58} className={styles.typeImage} />
                ) : (
                    <div className={styles.typeImage} />
                )}
                {categoryOffer && <h3>{categoryOffer}</h3>}
                {provider === "alert" ? <ButtonCanHelp id={id!} idUser={userId!} /> : null}
                {provider === "discussion" ? <AvatarsBalloon offerId={id} /> : null}
            </header>
            <section>
                <div data-profile>
                    <div
                        data-circle
                        onClick={(event) => {
                            event.stopPropagation()
                            handleImages()
                        }}
                        data-not-image={images?.length === 0}
                    >
                        <div data-r />
                        <NextImageMotion data-avatar src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={42} height={42} />
                    </div>
                    <div
                        data-info
                        onClick={(event) => {
                            event.stopPropagation()
                            handleProfile()
                        }}
                    >
                        <p>
                            {dataProfile?.res?.firstName || " "} {dataProfile?.res?.lastName || " "}
                        </p>
                        {geo ? <GeoTagging location={geo?.additional} fontSize={12} size={14} /> : null}
                    </div>
                </div>
                {title && (
                    <h4>
                        {provider === "offer" && <span>Могу: </span>}
                        {title}
                    </h4>
                )}
                {categoriesUser.length && provider === "offer" ? (
                    <article data-article-want>
                        <p>Хочу:</p>
                        {categoriesUser.map((item) => (
                            <div key={`::${item.id}::category::user::`} data-item>
                                <div data-img>
                                    <img
                                        src={IconCategory(item.id!)}
                                        alt={`${item.id!}`}
                                        width={16}
                                        height={16}
                                        onError={(error: any) => {
                                            if (error?.target) {
                                                try {
                                                    error.target.src = `/svg/category/default.svg`
                                                } catch (e) {
                                                    console.log("catch e: ", e)
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </article>
                ) : null}
            </section>
        </li>
    )
})
