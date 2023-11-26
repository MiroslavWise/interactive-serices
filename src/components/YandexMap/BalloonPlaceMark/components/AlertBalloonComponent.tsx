"use client"

import { isMobile } from "react-device-detect"
import { useQueries } from "@tanstack/react-query"

import type { TAlertBalloonComponent } from "../types/types"

import { BlockComments } from "./BlockComments"
import { ButtonSuccessInBalloon } from "./ButtonSuccessInBalloon"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useAuth } from "@/store/hooks"
import { daysAgo, usePush } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { usePhotoVisible } from "../hooks/usePhotoVisible"
import { useBalloonCard } from "@/store/state/useBalloonCard"
import { useProfilePublic } from "@/store/state/useProfilePublic"

export const AlertBalloonComponent: TAlertBalloonComponent = ({}) => {
    const userId = useAuth(({ userId }) => userId)
    const { handlePush } = usePush()
    const { createGallery } = usePhotoVisible()
    const dispatchProfilePublic = useProfilePublic(
        ({ dispatchProfilePublic }) => dispatchProfilePublic,
    )
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
                queryFn: () => serviceProfile.getUserId(Number(idUser)),
                queryKey: ["profile", idUser!],
                refetchOnMount: false,
            },
        ],
    })

    function handleHelp() {
        if (Number(userId) === Number(idUser)) {
            return
        }
        dispatch({ visible: false })
        handlePush(`/messages?user=${idUser}`)
    }

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
            <ImageStatic
                src="/map/circle-alert.png"
                alt="circle-alert"
                width={61}
                height={61}
                data-logo-ballon
            />
            <header data-alert>
                {Number(userId) !== Number(idUser) ? (
                    <ButtonSuccessInBalloon onClick={handleHelp} />
                ) : null}
            </header>
            <div data-container-balloon data-alert>
                <div data-info-profile>
                    <div
                        data-avatar-name
                        onClick={() => {
                            dispatchProfilePublic({
                                visible: true,
                                idUser: idUser!,
                            })
                        }}
                    >
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
                                {dataProfile?.res?.firstName}{" "}
                                {dataProfile?.res?.lastName}
                            </p>
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
                                width={40}
                                height={40}
                                className=""
                            />
                        ))}
                    </ul>
                ) : null}
            </div>
            <BlockComments type="alert" offerId={id!} />
        </>
    )
}
