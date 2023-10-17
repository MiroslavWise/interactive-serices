"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useQueries } from "react-query"

import type { TOfferBalloonComponent } from "../types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { daysAgo, usePush } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { usePhotoVisible } from "../hooks/usePhotoVisible"
import { useOffersCategories } from "@/store/state/useOffersCategories"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"

export const OfferBalloonComponent: TOfferBalloonComponent = ({
    stateBalloon,
}) => {
    const { userId } = useAuth()
    const { handlePush } = usePush()
    const { categories } = useOffersCategories()
    const { createGallery } = usePhotoVisible()
    const { dispatchVisibleBarter } = useVisibleModalBarter()

    const [{ data }, { data: dataProfile }] = useQueries([
        {
            queryFn: () => serviceOffers.getId(Number(stateBalloon.id!)),
            queryKey: [
                "offers",
                `offer=${stateBalloon.id!}`,
                `provider=${stateBalloon.type}`,
            ],
            refetchOnMount: false,
        },
        {
            queryFn: () =>
                serviceProfile.getUserId(Number(stateBalloon.idUser)),
            queryKey: ["profile", stateBalloon.idUser!],
            refetchOnMount: false,
        },
    ])

    const categoryTitle: string = useMemo(() => {
        return (
            categories?.find(
                (item) => Number(item.id) === Number(data?.res?.categoryId),
            )?.title || ""
        )
    }, [categories, data?.res])

    function handleOpenBarter() {
        dispatchVisibleBarter({
            isVisible: true,
            dataOffer: data?.res!,
            dataProfile: {
                photo: dataProfile?.res?.image?.attributes?.url!,
                fullName: `${dataProfile?.res?.firstName || ""} ${
                    dataProfile?.res?.lastName || ""
                }`,
                idUser: stateBalloon?.idUser!,
            },
        })
    }

    return (
        <>
            <ImageStatic
                src="/map/circle-offers-default.png"
                alt="circle-offers-default"
                width={61}
                height={61}
                rest={{
                    "data-logo-ballon": true,
                }}
            />
            <header data-offer>
                <h3>{categoryTitle}</h3>
            </header>
            <div data-container-balloon data-offer>
                <div data-info-profile>
                    <div data-avatar-name>
                        <NextImageMotion
                            src={dataProfile?.res?.image?.attributes?.url!}
                            alt="avatar"
                            width={400}
                            height={400}
                            className=""
                        />
                        <div data-name-rate>
                            <p>
                                {dataProfile?.res?.firstName}{" "}
                                {dataProfile?.res?.lastName}
                            </p>
                            <div data-rate>
                                <Image
                                    src="/svg/star.svg"
                                    alt="star"
                                    height={7.16}
                                    width={7.16}
                                />
                                <span>{4.5}</span>
                            </div>
                        </div>
                    </div>
                    <p data-date-updated>{daysAgo(data?.res?.updated!)}</p>
                </div>
                <h3>{data?.res?.title}</h3>
                {Array.isArray(data?.res?.images) &&
                data?.res?.images?.length ? (
                    <ul>
                        {data?.res?.images?.slice(0, 4)?.map((item, index) => (
                            <NextImageMotion
                                onClick={() => {
                                    createGallery(
                                        data?.res!,
                                        data?.res?.images!,
                                        item,
                                        index,
                                        {
                                            title: data?.res?.title!,
                                            name: `${
                                                dataProfile?.res?.firstName ||
                                                ""
                                            } ${
                                                dataProfile?.res?.lastName || ""
                                            }`,
                                            urlPhoto:
                                                dataProfile?.res?.image
                                                    ?.attributes?.url!,
                                            idUser: dataProfile?.res?.userId!,
                                            time: data?.res?.updated!,
                                        },
                                    )
                                }}
                                key={`${item?.id}-image-offer`}
                                src={item?.attributes?.url}
                                alt="offer-image"
                                width={400}
                                height={400}
                                className=""
                            />
                        ))}
                    </ul>
                ) : null}
                {data && userId && userId !== data?.res?.userId ? (
                    <div data-footer-buttons>
                        <button data-offer onClick={handleOpenBarter}>
                            <span>Откликнуться</span>
                        </button>
                        {Number(stateBalloon.idUser) !== Number(userId) ? (
                            <Image
                                src="/svg/chat-bubbles.svg"
                                alt="chat-bubbles"
                                width={32}
                                height={32}
                                onClick={() => {
                                    if (
                                        Number(stateBalloon.idUser) !==
                                        Number(userId)
                                    ) {
                                        handlePush(
                                            `/messages?user=${stateBalloon?.idUser!}`,
                                        )
                                    }
                                }}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>
        </>
    )
}
