"use client"

import { useTheme } from "next-themes"
import { isMobile } from "react-device-detect"
import { useSwipeable } from "react-swipeable"
import { useState, useEffect, useCallback, useMemo, memo } from "react"

import type { TRequestsAndProposals } from "./types"

import { MotionLI } from "@/components/common/Motion"
import { ButtonFill } from "@/components/common/Buttons"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./style.module.scss"
import { useQuery } from "react-query"
import { serviceUsers } from "@/services/users"

const $CardRequestsAndProposals: TRequestsAndProposals = ({
    id,
    parentId,
    categoryId,
    provider,
    title,
    slug,
    description,
    content,
    imageId,
    featuredId,
    bannerId,
    userId,
    addresses,
    images,
    updated,
    type,
}) => {
    const [active, setActive] = useState(0)
    const { systemTheme } = useTheme()
    const { userId: myUserId } = useAuth()
    const { categories } = useOffersCategories()
    const { handlePush } = usePush()
    const { dispatchMapCoordinates } = useMapCoordinates()
    const { dispatch } = useBalloonCard()
    const { dispatchVisibleBarter } = useVisibleModalBarter()

    const handlers = useSwipeable({
        onSwipedLeft(event) {
            slideImage("toLeft")
        },
        onSwipedRight(event) {
            slideImage("toRight")
        },
    })

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", id],
        enabled: userId !== myUserId,
    })

    const categoryCurrent = useMemo(() => {
        return categories?.find(
            (item) => Number(item?.id) === Number(categoryId),
        )
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
            const dataOffer = {
                id,
                parentId,
                categoryId,
                provider,
                title,
                slug,
                description,
                content,
                imageId,
                featuredId,
                bannerId,
                userId,
                addresses,
                images,
                updated,
            }

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
                dataOffer: dataOffer,
                dataProfile: dataProfile,
            })
        }
    }

    return (
        <MotionLI
            classNames={[styles.container]}
            data={{
                "data-mobile": isMobile,
                "data-type": type,
            }}
        >
            <header>
                <ImageStatic
                    src="/map/circle-offers-default.png"
                    alt="offer"
                    width={58}
                    height={58}
                    onClick={handleCoordinates}
                />
                <h4>{categoryCurrent?.title || ""}</h4>
            </header>
            <section>
                <h5>{title}</h5>
                {images?.length ? (
                    <div className={styles.carouselPhotos} {...handlers}>
                        {images?.map((item, index) => (
                            <NextImageMotion
                                key={`${item.attributes.hash}-image`}
                                className={cx(
                                    index === active && styles.active,
                                )}
                                alt="image"
                                src={item.attributes.url}
                                width={48}
                                height={48}
                            />
                        ))}
                        <div className={styles.containerDots}>
                            {images.map((item, index) => (
                                <span
                                    key={index + id + "dots"}
                                    className={cx(
                                        active === index && styles.active,
                                    )}
                                    onClick={() => setActive(index)}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
                {userId !== myUserId && myUserId ? (
                    <div
                        className={styles.button}
                        data-relative={!images?.length}
                    >
                        <ButtonFill
                            type={
                                systemTheme === "dark" ? "primary" : "secondary"
                            }
                            label="Откликнутся"
                            handleClick={handleBarter}
                        />
                    </div>
                ) : null}
            </section>
        </MotionLI>
    )
}

export const CardRequestsAndProposals = memo($CardRequestsAndProposals)
