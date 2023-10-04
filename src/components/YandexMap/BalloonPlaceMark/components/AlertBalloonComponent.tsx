"use client"

import { useState } from "react"
import { useQuery } from "react-query"

import type { TAlertBalloonComponent } from "../types/types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { ButtonSuccessInBalloon } from "./ButtonSuccessInBalloon"

import { daysAgo } from "@/helpers"
import { serviceOffer } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import Image from "next/image"

export const AlertBalloonComponent: TAlertBalloonComponent = ({
    stateBalloon,
}) => {
    const [activeListComments, setActiveListComments] = useState(false)
    const { data } = useQuery({
        queryFn: () => serviceOffer.getId(Number(stateBalloon.id!)),
        queryKey: ["alert", stateBalloon.id!],
        refetchOnMount: false,
    })
    const { data: dataProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(Number(stateBalloon.idUser)),
        queryKey: ["profile", stateBalloon.idUser!],
        refetchOnMount: false,
    })

    function handleHelp() {}

    return (
        <>
            <ImageStatic
                src="/map/circle-alert.png"
                alt="circle-alert"
                width={61}
                height={61}
                rest={{
                    "data-logo-ballon": true,
                }}
            />
            <header data-alert>
                <ButtonSuccessInBalloon idUser={1} onClick={handleHelp} />
            </header>
            <div data-container-balloon data-alert>
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
            <footer data-alert>
                <button>
                    <span>125 комментариев</span>
                    <Image
                        src="/svg/chevron-down.svg"
                        alt="chevron-down"
                        width={18}
                        height={18}
                    />
                </button>
            </footer>
        </>
    )
}
