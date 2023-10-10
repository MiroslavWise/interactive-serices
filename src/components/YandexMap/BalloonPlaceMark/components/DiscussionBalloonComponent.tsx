"use client"

import Image from "next/image"
import { useQueries } from "react-query"

import type { TDiscussionBalloonComponent } from "../types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { daysAgo } from "@/helpers"
import { serviceOffer } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { usePhotoVisible } from "../hooks/usePhotoVisible"

export const DiscussionBalloonComponent: TDiscussionBalloonComponent = ({
    stateBalloon,
}) => {
    const { createGallery } = usePhotoVisible()
    const [{ data }, { data: dataProfile }] = useQueries([
        {
            queryFn: () => serviceOffer.getId(Number(stateBalloon.id!)),
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
            </div>
            <footer data-discussion>
                <button>
                    <span>125 комментариев</span>
                    <Image
                        src="/svg/chevron-down.svg"
                        alt="chevron-down"
                        width={18}
                        height={18}
                    />
                </button>
                <div data-likes>
                    <Image
                        src="/svg/thumbs-up.svg"
                        alt="thumbs-up"
                        width={18}
                        height={18}
                    />
                    <p>112</p>
                </div>
            </footer>
        </>
    )
}
