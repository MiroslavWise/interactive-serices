"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "react-query"

import type { TOfferBalloonComponent } from "../types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { daysAgo } from "@/helpers"
import { serviceOffer } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { useOffersCategories } from "@/store/state/useOffersCategories"

export const OfferBalloonComponent: TOfferBalloonComponent = ({
    stateBalloon,
}) => {
    const { categories } = useOffersCategories()
    const { data } = useQuery({
        queryFn: () => serviceOffer.getId(Number(stateBalloon.id!)),
        queryKey: ["offer", stateBalloon.id!],
        refetchOnMount: false,
    })
    const { data: dataProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(Number(stateBalloon.idUser)),
        queryKey: ["profile", stateBalloon.idUser!],
        refetchOnMount: false,
    })

    const categoryTitle: string = useMemo(() => {
        return (
            categories?.find(
                (item) => Number(item.id) === Number(data?.res?.categoryId),
            )?.title || ""
        )
    }, [categories, data?.res])

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
                        {data?.res?.images
                            ?.slice(0, 4)
                            ?.map((item) => (
                                <NextImageMotion
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
                <div data-footer-buttons>
                    <button data-offer>
                        <span>Откликнуться</span>
                    </button>
                    <Image
                        src="/svg/chat-bubbles.svg"
                        alt="chat-bubbles"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </>
    )
}
