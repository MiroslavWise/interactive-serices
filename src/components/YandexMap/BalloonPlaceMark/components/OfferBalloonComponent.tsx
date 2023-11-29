"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQueries } from "@tanstack/react-query"

import type { TOfferBalloonComponent } from "../types/types"

import { NextImageMotion } from "@/components/common"

import {
    useOffersCategories,
    useProfilePublic,
    useBalloonCard,
} from "@/store/hooks"
import { daysAgo, usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { serviceOffers } from "@/services/offers"
import { usePhotoVisible } from "../hooks/usePhotoVisible"
import { ButtonReplyPrimary } from "@/components/common/custom"

export const OfferBalloonComponent: TOfferBalloonComponent = () => {
    const { handlePush } = usePush()
    const categories = useOffersCategories(({ categories }) => categories)
    const { createGallery } = usePhotoVisible()
    const dispatchProfilePublic = useProfilePublic(
        ({ dispatchProfilePublic }) => dispatchProfilePublic,
    )
    const id = useBalloonCard(({ id }) => id)
    const idUser = useBalloonCard(({ idUser }) => idUser)
    const type = useBalloonCard(({ type }) => type)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const [{ data }, { data: dataUser }] = useQueries({
        queries: [
            {
                queryFn: () => serviceOffers.getId(Number(id!)),
                queryKey: ["offers", `offer=${id!}`, `provider=${type}`],
                refetchOnMount: false,
            },
            {
                queryFn: () => serviceUsers.getId(Number(idUser)),
                queryKey: ["user", idUser!],
                enabled: !!idUser!,
                refetchOnMount: false,
            },
        ],
    })

    const categoryTitle: string = useMemo(() => {
        return (
            categories?.find(
                (item) => Number(item.id) === Number(data?.res?.categoryId),
            )?.title || ""
        )
    }, [categories, data?.res])

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
            <div
                data-logo-ballon-offer
                style={{
                    backgroundImage: `url(/svg/category/${data?.res
                        ?.categoryId!}.svg)`,
                }}
            />
            <header data-offer>
                <h3>{categoryTitle}</h3>
            </header>
            <div data-container-balloon data-offer>
                <div data-info-profile>
                    <div data-avatar-name>
                        <NextImageMotion
                            src={
                                dataUser?.res?.profile?.image?.attributes?.url!
                            }
                            alt="avatar"
                            width={40}
                            height={40}
                            className=""
                            onClick={handleProfile}
                        />
                        <div data-name-rate>
                            <p>
                                {dataUser?.res?.profile?.firstName}{" "}
                                {dataUser?.res?.profile?.lastName}
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
                                                dataUser?.res?.profile
                                                    ?.firstName || ""
                                            } ${
                                                dataUser?.res?.profile
                                                    ?.lastName || ""
                                            }`,
                                            urlPhoto:
                                                dataUser?.res?.profile?.image
                                                    ?.attributes?.url!,
                                            idUser: dataUser?.res?.profile
                                                ?.userId!,
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
                <ButtonReplyPrimary
                    isBalloon
                    offer={data?.res!}
                    user={dataUser?.res!}
                />
            </div>
        </>
    )
}
