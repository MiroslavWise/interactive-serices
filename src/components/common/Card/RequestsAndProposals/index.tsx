"use client"

import { SyntheticEvent, useState } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TRequestsAndProposals } from "./types"

import { ButtonReplyPrimary } from "../../custom/ButtonReply"
import { GeoTagging, NextImageMotion } from "@/components/common"

import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { useBalloonCard, useMapCoordinates, useOffersCategories } from "@/store/hooks"
import { usePhotoVisible } from "@/components/YandexMap/BalloonPlaceMark/hooks/usePhotoVisible"

import styles from "./style.module.scss"
import Image from "next/image"

export const CardRequestsAndProposals: TRequestsAndProposals = (props) => {
    const { handlePush } = usePush()
    const { createGallery } = usePhotoVisible()
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)
    const categories = useOffersCategories(({ categories }) => categories)
    const dispatchMapCoordinates = useMapCoordinates(({ dispatchMapCoordinates }) => dispatchMapCoordinates)

    const { id, categoryId, provider, title, userId, addresses, images, type } = props ?? {}

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", userId],
        enabled: !!userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const categoryCurrent = categories?.find((item) => Number(item?.id) === Number(categoryId))!

    function handleCoordinates() {
        handlePush("/")
        requestAnimationFrame(() => {
            dispatchMapCoordinates({
                coordinates: addresses?.[0]?.coordinates?.split(" ")?.reverse()?.map(Number),
            })
            dispatch({
                visible: true,
                type: provider!,
                id: id,
                idUser: userId,
            })
        })
    }

    function handleImages() {
        const { type, ...data } = props ?? {}
        if (data?.images?.length) {
            createGallery(data, data?.images, data?.images[0], 0, {
                title: data?.title!,
                name: `${dataUser?.res?.profile?.firstName || ""} ${dataUser?.res?.profile?.lastName || ""}`,
                urlPhoto: dataUser?.res?.profile?.image?.attributes?.url!,
                idUser: dataUser?.res?.id!,
                time: data?.updated!,
            })
        }
    }

    const geo = addresses && !!addresses.length && addresses[0]
    const categoriesUser = dataUser?.res?.categories || []

    const [src, setSrc] = useState(`/svg/category/${categoryId}.svg`)

    return (
        <li className={styles.container} data-mobile={isMobile} data-type={type} data-offers-card onClick={handleCoordinates}>
            <header>
                <Image
                    src={src}
                    alt="point"
                    width={58}
                    height={58}
                    onError={(err) => {
                        console.log("err div: ", err)
                        setSrc(`/svg/category/default.svg`)
                    }}
                    unoptimized
                />
                <h4>{categoryCurrent?.title || ""}</h4>
            </header>
            <section>
                <div data-profile>
                    <div
                        data-circle
                        onClick={(event) => {
                            event.stopPropagation()
                            handleImages()
                        }}
                    >
                        <div data-r>
                            {images?.length
                                ? images?.map((item, index) => (
                                      <div
                                          data-l
                                          key={`::${item.id}::rotate::`}
                                          style={{
                                              transform: `rotate(${(360 / images.length) * index}deg)`,
                                          }}
                                      >
                                          <div data-c />
                                      </div>
                                  ))
                                : null}
                        </div>
                        <NextImageMotion
                            data-is-length={!!images?.length}
                            src={dataUser?.res?.profile?.image?.attributes?.url!}
                            alt="avatar"
                            width={42}
                            height={42}
                        />
                    </div>
                    <div data-info>
                        <p>
                            {dataUser?.res?.profile?.firstName || " "} {dataUser?.res?.profile?.lastName || " "}
                        </p>
                        {geo ? <GeoTagging location={geo?.additional} fontSize={12} size={14} /> : null}
                    </div>
                </div>
                <h5>
                    <span>Могу:</span> {title}
                </h5>
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
                {<ButtonReplyPrimary user={dataUser?.res!} offer={props} />}
            </section>
        </li>
    )
}
