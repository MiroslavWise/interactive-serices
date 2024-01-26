"use client"

import { SyntheticEvent, useMemo } from "react"
import { isMobile } from "react-device-detect"
import { useQueries } from "@tanstack/react-query"

import type { TOfferBalloonComponent } from "../types/types"

import { NextImageMotion } from "@/components/common"
import { ButtonReplyPrimary } from "@/components/common/custom"

import { daysAgo, usePush } from "@/helpers"
import { serviceOffers } from "@/services/offers"
import { serviceProfile } from "@/services/profile"
import { usePhotoVisible } from "../hooks/usePhotoVisible"
import { useOffersCategories, useProfilePublic, useBalloonCard } from "@/store/hooks"

export const OfferBalloonComponent: TOfferBalloonComponent = () => {
    const { handlePush } = usePush()
    const categories = useOffersCategories(({ categories }) => categories)
    const { createGallery } = usePhotoVisible()
    const dispatchProfilePublic = useProfilePublic(({ dispatchProfilePublic }) => dispatchProfilePublic)
    const id = useBalloonCard(({ id }) => id)
    const idUser = useBalloonCard(({ idUser }) => idUser)
    const type = useBalloonCard(({ type }) => type)
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)

    const [{ data }, { data: dataUser }] = useQueries({
        queries: [
            {
                queryFn: () => serviceOffers.getId(Number(id!)),
                queryKey: ["offers", { offerId: id }],
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

    // const categoriesUser = dataUser?.res?.categories || []

    return (
        <>
            {/* <header>
                <div data-category-img>
                    {data?.res?.categoryId ? (
                        <img
                            src={`/svg/category/${data?.res?.categoryId}.svg`}
                            alt="category"
                            width={16}
                            height={16}
                            onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                                if (error?.target) {
                                    try {
                                        //@ts-ignore
                                        error.target.src = `/svg/category/default.svg`
                                    } catch (e) {
                                        console.log("catch e: ", e)
                                    }
                                }
                            }}
                        />
                    ) : null}
                </div>
                <h3>{categoryTitle}</h3>
            </header>
            <div data-container-balloon data-offer>
                <div data-info-profile>
                    <div data-avatar-name>
                        <NextImageMotion
                            src={dataUser?.res?.profile?.image?.attributes?.url!}
                            alt="avatar"
                            width={40}
                            height={40}
                            className=""
                            onClick={handleProfile}
                        />
                        <div data-name-rate>
                            <p>
                                {dataUser?.res?.profile?.firstName} {dataUser?.res?.profile?.lastName}
                            </p>
                        </div>
                    </div>
                    <p data-date-updated>{daysAgo(data?.res?.updated!)}</p>
                </div>
                <h3>
                    <span>Могу:</span> {data?.res?.title}
                </h3>
                {categoriesUser.length ? (
                    <article data-article-want>
                        <p>Хочу:</p>
                        {categoriesUser.map((item) => (
                            <div key={`::${item.id}::category::user::`} data-item>
                                <img
                                    src={`/svg/category/${item.id}.svg`}
                                    alt={`${item.id!}`}
                                    width={28}
                                    height={28}
                                    onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                                        if (error?.target) {
                                            try {
                                                //@ts-ignore
                                                error.target.src = `/svg/category/default.svg`
                                            } catch (e) {
                                                console.log("catch e: ", e)
                                            }
                                        }
                                    }}
                                />
                                <p>{item.title}</p>
                            </div>
                        ))}
                    </article>
                ) : null}
                {Array.isArray(data?.res?.images) && data?.res?.images?.length ? (
                    <ul>
                        {data?.res?.images?.slice(0, 4)?.map((item, index) => (
                            <NextImageMotion
                                onClick={() => {
                                    createGallery(data?.res!, data?.res?.images!, item, index, {
                                        title: data?.res?.title!,
                                        name: `${dataUser?.res?.profile?.firstName || ""} ${dataUser?.res?.profile?.lastName || ""}`,
                                        urlPhoto: dataUser?.res?.profile?.image?.attributes?.url!,
                                        idUser: dataUser?.res?.profile?.userId!,
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
                <ButtonReplyPrimary isBalloon offer={data?.res!} user={dataUser?.res!} /> */}
            {/* </div> */}
        </>
    )
}
