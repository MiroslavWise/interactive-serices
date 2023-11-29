"use client"

import { useState } from "react"
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

    const [src, setSrc] = useState(`/svg/category/${categoryId}.svg`)

    return (
        <li className={styles.container} data-mobile={isMobile} data-type={type} data-offers-card onClick={handleCoordinates}>
            <header>
                <div
                    style={{
                        backgroundImage: `url(${src})`,
                    }}
                    onError={(err) => console.log("err div: ", err)}
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
                                          key={`${item.id}-1`}
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
                <h5>{title}</h5>
                {<ButtonReplyPrimary user={dataUser?.res!} offer={props} />}
            </section>
        </li>
    )
}
