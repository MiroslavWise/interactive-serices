"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect, useCallback, useMemo } from "react"

import type { TRequestsAndProposals } from "./types"

import { Button, GeoTagging, NextImageMotion } from "@/components/common"

import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { usePhotoVisible } from "@/components/YandexMap/BalloonPlaceMark/hooks/usePhotoVisible"

import styles from "./style.module.scss"

export const CardRequestsAndProposals: TRequestsAndProposals = (props) => {
    const [active, setActive] = useState(0)
    const { systemTheme } = useTheme()
    const { userId: myUserId } = useAuth()
    const { categories } = useOffersCategories()
    const { handlePush } = usePush()
    const { dispatchMapCoordinates } = useMapCoordinates()
    const { dispatch } = useBalloonCard()
    const { dispatchVisibleBarter } = useVisibleModalBarter()
    const { createGallery } = usePhotoVisible()

    const { id, categoryId, provider, title, userId, addresses, images, type } =
        props ?? {}

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", id],
        enabled: !!userId,
    })

    const categoryCurrent = useMemo(() => {
        return categories?.find(
            (item) => Number(item?.id) === Number(categoryId),
        )!
    }, [categories, categoryId])

    const slideImage = useCallback(
        (direction: "toLeft" | "toRight") => {
            if (direction === "toLeft") {
                active >= images.length - 1
                    ? setActive(0)
                    : setActive((prev) => prev + 1)
            }
            if (direction === "toRight") {
                if (active <= 0) {
                    setActive(images.length - 1)
                } else {
                    setActive((prev) => prev - 1)
                }
            }
        },
        [active, images],
    )

    useEffect(() => {
        const interval = setInterval(() => {
            slideImage("toLeft")
        }, 3333)

        return () => clearInterval(interval)
    }, [slideImage])

    function handleCoordinates() {
        handlePush("/")
        dispatchMapCoordinates({
            coordinates: addresses?.[0]?.coordinates
                ?.split(" ")
                ?.reverse()
                ?.map(Number),
            zoom: 20,
        })
        dispatch({
            visible: true,
            type: provider!,
            id: id,
            idUser: userId,
        })
    }

    function handleBarter() {
        if (myUserId) {
            if (provider === "offer") {
                const name = `${dataUser?.res?.profile?.firstName || " "} ${
                    dataUser?.res?.profile?.lastName || " "
                }`
                const dataProfile = {
                    photo: dataUser?.res?.profile?.image?.attributes?.url!,
                    fullName: name,
                    idUser: userId!,
                }
                dispatchVisibleBarter({
                    isVisible: true,
                    dataOffer: props,
                    dataProfile: dataProfile,
                })
            }
            if (provider === "request") {
                if (userId) {
                    handlePush(`/messages?user=${userId}`)
                }
            }
        }
    }

    function handleImages() {
        const { type, ...data } = props ?? {}
        if (data?.images?.length) {
            createGallery(data, data?.images, data?.images[0], 0, {
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

    const [src, setSrc] = useState(`/svg/category/${categoryId}.svg`)

    return (
        <li
            className={styles.container}
            data-mobile={isMobile}
            data-type={type}
            onClick={handleCoordinates}
        >
            <header>
                <Image
                    src={src}
                    alt="offer"
                    width={58}
                    height={58}
                    onError={(error) => {
                        console.log("ing error: ", error)
                        console.log("ing error: ", src)
                        setSrc("/svg/category/broom.svg")
                    }}
                />
                <h4>{categoryCurrent?.title || ""}</h4>
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
                            {images?.length
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
                <h5>{title}</h5>
                {userId !== myUserId && myUserId ? (
                    <div
                        className={styles.button}
                        data-relative={!images?.length}
                    >
                        <Button
                            type="button"
                            typeButton={
                                systemTheme === "dark"
                                    ? "fill-primary"
                                    : "fill-orange"
                            }
                            label="Откликнутся"
                            onClick={(event) => {
                                event.stopPropagation()
                                event.preventDefault()
                                handleBarter()
                            }}
                        />
                    </div>
                ) : null}
            </section>
        </li>
    )
}
