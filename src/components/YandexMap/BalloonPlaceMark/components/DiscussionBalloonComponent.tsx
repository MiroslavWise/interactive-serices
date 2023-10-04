"use client"

import { useQuery } from "react-query"

import type { TDiscussionBalloonComponent } from "../types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { serviceOffer } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { daysAgo } from "@/helpers"
import Image from "next/image"

export const DiscussionBalloonComponent: TDiscussionBalloonComponent = ({
    stateBalloon,
}) => {
    const { data } = useQuery({
        queryFn: () => serviceOffer.getId(Number(stateBalloon.id!)),
        queryKey: ["discussion", stateBalloon.id!],
        refetchOnMount: false,
    })
    const { data: dataProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(Number(stateBalloon.idUser)),
        queryKey: ["profile", stateBalloon.idUser!],
        refetchOnMount: false,
    })

    return (
        <>
            <ImageStatic
                src="/map/circle-discussion.png"
                alt="circle-discussion"
                width={61}
                height={61}
                rest={{
                    "data-logo-ballon": true,
                }}
            />
            <header></header>
            <div data-container-balloon data-discussion>
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
            </div>
            <footer data-discussion></footer>
        </>
    )
}
