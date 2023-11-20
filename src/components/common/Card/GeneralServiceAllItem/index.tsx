"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TGeneralServiceAllItem } from "./types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { GeoTagging, ImageStatic, NextImageMotion } from "@/components/common"
import { AvatarsBalloon } from "@/components/YandexMap/BalloonPlaceMark/components/AvatarsBalloon"

import {
    useAuth,
    useBalloonCard,
    useMapCoordinates,
    useOffersCategories,
} from "@/store/hooks"
import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { usePhotoVisible } from "@/components/YandexMap/BalloonPlaceMark/hooks/usePhotoVisible"

import styles from "./style.module.scss"

export const GeneralServiceAllItem: TGeneralServiceAllItem = (props) => {
    const {
        id,
        categoryId,
        provider,
        title,
        userId,
        addresses,
        className,
        images,
    } = props ?? {}
    const { userId: myUserId } = useAuth()
    const { handlePush } = usePush()
    const { categories } = useOffersCategories()
    const { dispatch } = useBalloonCard()
    const { dispatchMapCoordinates } = useMapCoordinates()
    const { createGallery } = usePhotoVisible()

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", id],
        enabled: userId !== myUserId,
    })

    const typeImagePng: string | null = useMemo(() => {
        const obj: Readonly<Partial<Record<TTypeProvider, any>>> = {
            offer: "/map/circle-offers-default.png",
            discussion: "/map/circle-discussion.png",
            alert: "/map/circle-alert.png",
            request: "/map/circle-offers-default.png",
        }

        return obj[provider] || null
    }, [provider])

    const categoryOffer: string | null = useMemo(() => {
        if (
            ["request", "offer"].includes(provider) &&
            categoryId &&
            categories.length
        ) {
            return categories.find(
                (item) => Number(item.id) === Number(categoryId),
            )?.title!
        }

        return null
    }, [provider, categoryId, categories])

    //

    function handle() {
        const [address, ...rest] = addresses
        dispatch({
            visible: true,
            id: id,
            idUser: userId,
            type: provider || null,
        })
        dispatchMapCoordinates({
            coordinates: address?.coordinates
                ?.split(" ")
                ?.reverse()
                ?.map(Number),
        })
        handlePush("/")
    }

    function handleHelp() {
        if (!myUserId || myUserId === userId) {
            return
        }
        handlePush(`/messages?user=${userId}`)
    }

    function handleImages() {
        const { ...data } = props ?? {}
        if (images?.length) {
            createGallery(data, images, images[0], 0, {
                title: data?.title!,
                name: `${dataUser?.res?.profile?.firstName || ""} ${
                    dataUser?.res?.profile?.lastName || ""
                }`,
                urlPhoto: dataUser?.res?.profile?.image?.attributes?.url!,
                idUser: dataUser?.res?.id!,
                time: data?.updated!,
            })
        }
    }

    const geo = useMemo(() => {
        if (addresses && addresses.length) {
            return addresses?.find((item) => item?.addressType === "main")
        }
        return null
    }, [addresses])

    return (
        <li className={cx(styles.container, className)} onClick={handle}>
            <header data-provider={provider}>
                {typeImagePng ? (
                    <ImageStatic
                        src={typeImagePng}
                        alt="offer"
                        width={58}
                        height={58}
                        classNames={[styles.typeImage]}
                    />
                ) : (
                    <div className={styles.typeImage} />
                )}
                {categoryOffer && <h3>{categoryOffer}</h3>}
                {provider === "alert" && userId !== myUserId && myUserId ? (
                    <button
                        data-help
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleHelp()
                        }}
                    >
                        <span>Могу помочь!</span>
                    </button>
                ) : null}
                {provider === "discussion" ? (
                    <AvatarsBalloon offerId={id} />
                ) : null}
            </header>
            <section>
                <div data-profile>
                    <div
                        data-circle
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
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
                                              transform: `rotate(${
                                                  (360 / images.length) * index
                                              }deg)`,
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
                            src={
                                dataUser?.res?.profile?.image?.attributes?.url!
                            }
                            alt="avatar"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div data-info>
                        <p>
                            {dataUser?.res?.profile?.firstName || " "}{" "}
                            {dataUser?.res?.profile?.lastName || " "}
                        </p>
                        {geo ? (
                            <GeoTagging
                                location={geo?.additional}
                                fontSize={12}
                                size={14}
                            />
                        ) : null}
                    </div>
                </div>
                {title && <h4>{title}</h4>}
            </section>
        </li>
    )
}
