"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { useQueries } from "react-query"

import type { TAlertBalloonComponent } from "../types/types"

import { BlockComments } from "./BlockComments"
import { ButtonSuccessInBalloon } from "./ButtonSuccessInBalloon"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useAuth } from "@/store/hooks"
import { daysAgo, usePush } from "@/helpers"
import { serviceOffer } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { usePhotoVisible } from "../hooks/usePhotoVisible"

export const AlertBalloonComponent: TAlertBalloonComponent = ({
    stateBalloon,
}) => {
    const { userId } = useAuth()
    const [activeListComments, setActiveListComments] = useState(false)
    const { handlePush } = usePush()
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

    function handleHelp() {
        if (Number(userId) === Number(stateBalloon?.idUser)) {
            return
        }
        handlePush(`/messages?user=${stateBalloon.idUser}`)
    }

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
                {Number(userId) !== Number(stateBalloon?.idUser) ? (
                    <ButtonSuccessInBalloon onClick={handleHelp} />
                ) : null}
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
            {!activeListComments ? <BlockComments /> : null}
        </>
    )
}
