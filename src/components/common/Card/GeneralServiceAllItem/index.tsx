"use client"

import { SyntheticEvent, forwardRef, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { IGeneralServiceAllItem } from "./types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { ButtonCanHelp } from "@/components/common/custom"
import { GeoTagging, ImageStatic, NextImageMotion } from "@/components/common"
import { AvatarsBalloon } from "@/components/YandexMap/BalloonPlaceMark/components/AvatarsBalloon"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { usePhotoVisible } from "@/components/YandexMap/BalloonPlaceMark/hooks/usePhotoVisible"
import { useBalloonCard, useMapCoordinates, useOffersCategories, useProfilePublic } from "@/store/hooks"

import styles from "./style.module.scss"

export const GeneralServiceAllItem = forwardRef(function GeneralServiceAllItem(props: IGeneralServiceAllItem) {
    const { id, categoryId, provider, title, userId, addresses, className, images, style } = props ?? {}
    const { handlePush } = usePush()
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)
    const dispatchMapCoordinates = useMapCoordinates(({ dispatchMapCoordinates }) => dispatchMapCoordinates)
    const { createGallery } = usePhotoVisible()
    const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)
    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", userId],
        enabled: !!userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const typeImagePng: string | null = useMemo(() => {
        let img = "/svg/category/default.svg"

        if (provider === "offer" && categoryId) {
            img = `/svg/category/${categoryId}.svg`
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
        ["request", "offer"].includes(provider) && categoryId && categories.length
            ? categories.find((item) => Number(item.id) === Number(categoryId))?.title!
            : null

    function handle() {
        const [address] = addresses
        handlePush("/")
        requestAnimationFrame(() => {
            dispatch({
                visible: true,
                id: id,
                idUser: userId,
                type: provider || null,
            })
            dispatchMapCoordinates({
                coordinates: address?.coordinates?.split(" ")?.reverse()?.map(Number),
            })
        })
    }

    function handleImages() {
        const { ...data } = props ?? {}
        if (images?.length) {
            createGallery(data, images, images[0], 0, {
                title: data?.title!,
                name: `${dataUser?.res?.profile?.firstName || ""} ${dataUser?.res?.profile?.lastName || ""}`,
                urlPhoto: dataUser?.res?.profile?.image?.attributes?.url!,
                idUser: dataUser?.res?.id!,
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
    const categoriesUser = dataUser?.res?.categories || []

    return (
        <li className={cx(styles.container, className)} onClick={handle} style={style}>
            <header data-provider={provider}>
                {typeImagePng ? (
                    <ImageStatic
                        src={typeImagePng}
                        alt="offer"
                        width={58}
                        height={58}
                        className={styles.typeImage}
                        onClick={(event: any) => {
                            event.stopPropagation()
                            handle()
                        }}
                        onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                            if (provider === "offer") {
                                if (error?.target) {
                                    try {
                                        //@ts-ignore
                                        error.target.src = `/svg/category/default.svg`
                                    } catch (e) {
                                        console.log("catch e: ", e)
                                    }
                                }
                            }
                        }}
                    />
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
                    >
                        <div data-r>
                            {images?.length && images?.length !== 1
                                ? images?.map((item, index) => (
                                      <div
                                          data-l
                                          key={`${item.id}-1`}
                                          style={{
                                              transform: `rotate(${(360 / images.length) * index}deg)`,
                                          }}
                                      >
                                          <div data-c />
                                      </div>
                                  ))
                                : null}
                        </div>
                        <NextImageMotion
                            data-avatar
                            data-is-length={!!images?.length}
                            src={dataUser?.res?.profile?.image?.attributes?.url!}
                            alt="avatar"
                            width={42}
                            height={42}
                        />
                    </div>
                    <div
                        data-info
                        onClick={(event) => {
                            event.stopPropagation()
                            handleProfile()
                        }}
                    >
                        <p>
                            {dataUser?.res?.profile?.firstName || " "} {dataUser?.res?.profile?.lastName || " "}
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
            </section>
        </li>
    )
})
