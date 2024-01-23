"use client"

import { isMobile } from "react-device-detect"
import { useQueries } from "@tanstack/react-query"

import type { TDiscussionBalloonComponent } from "../types/types"

import { BlockComments } from "./BlockComments"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { daysAgo, usePush } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { usePhotoVisible } from "../hooks/usePhotoVisible"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useProfilePublic } from "@/store/state/useProfilePublic"
import { AvatarsBalloon } from "./AvatarsBalloon"

export const DiscussionBalloonComponent: TDiscussionBalloonComponent = ({}) => {
    const { createGallery } = usePhotoVisible()
    const { handlePush } = usePush()
    const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)
    const id = useBalloonCard(({ id }) => id)
    const idUser = useBalloonCard(({ idUser }) => idUser)
    const type = useBalloonCard(({ type }) => type)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const [{ data }, { data: dataProfile }] = useQueries({
        queries: [
            {
                queryFn: () => serviceOffers.getId(Number(id!)),
                queryKey: ["offers", `offer=${id!}`, `provider=${type}`],
                refetchOnMount: false,
            },
            {
                queryFn: () => serviceProfile.getUserId(idUser!),
                queryKey: ["profile", idUser!],
                enabled: !!idUser,
                refetchOnMount: false,
            },
        ],
    })

    function handleProfile() {
        if (isMobile) {
            handlePush(`/user?id=${idUser!}`)
            dispatch({ visible: false })
        } else {
            dispatchProfilePublic({
                visible: true,
                idUser: idUser!,
            })
        }
    }

    return (
        <>
            <ImageStatic src="/map/circle-discussion.png" alt="circle-discussion" width={61} height={61} data-logo-ballon />
            <header data-avatars>
                <AvatarsBalloon offerId={id!} />
            </header>
            <div data-container-balloon data-discussion>
                <div data-info-profile>
                    <div data-avatar-name>
                        <NextImageMotion
                            src={dataProfile?.res?.image?.attributes?.url!}
                            alt="avatar"
                            width={400}
                            height={400}
                            className=""
                            onClick={handleProfile}
                        />
                        <div data-name-rate>
                            <p>
                                {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
                            </p>
                            {/* <div data-rate>
                                <Image
                                    src="/svg/star.svg"
                                    alt="star"
                                    height={7.16}
                                    width={7.16}
                                />
                                <span>{4.5}</span>
                            </div> */}
                        </div>
                    </div>
                    <p data-date-updated>{daysAgo(data?.res?.updated!)}</p>
                </div>
                <h3>{data?.res?.title}</h3>
                {Array.isArray(data?.res?.images) && data?.res?.images?.length ? (
                    <ul>
                        {data?.res?.images?.slice(0, 4)?.map((item, index) => (
                            <NextImageMotion
                                onClick={() => {
                                    createGallery(data?.res!, data?.res?.images!, item, index, {
                                        title: data?.res?.title!,
                                        name: `${dataProfile?.res?.firstName || ""} ${dataProfile?.res?.lastName || ""}`,
                                        urlPhoto: dataProfile?.res?.image?.attributes?.url!,
                                        idUser: dataProfile?.res?.userId!,
                                        time: data?.res?.updated!,
                                    })
                                }}
                                key={`${item?.id}-image-offer`}
                                src={item?.attributes?.url}
                                alt="offer-image"
                                width={40}
                                height={40}
                                className=""
                            />
                        ))}
                    </ul>
                ) : null}
            </div>
            <BlockComments type="discussion" offerId={id!} />
        </>
    )
}
