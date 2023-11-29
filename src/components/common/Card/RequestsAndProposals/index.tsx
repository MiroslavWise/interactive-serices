"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { TRequestsAndProposals } from "./types"

import { Button, GeoTagging, NextImageMotion } from "@/components/common"

import {
    useAuth,
    useVisibleModalBarter,
    useBalloonCard,
    useMapCoordinates,
    useOffersCategories,
} from "@/store/hooks"
import { usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { usePhotoVisible } from "@/components/YandexMap/BalloonPlaceMark/hooks/usePhotoVisible"

import styles from "./style.module.scss"
import { ButtonReplyPrimary } from "../../custom/ButtonReply"

export const CardRequestsAndProposals: TRequestsAndProposals = (props) => {
    const myUserId = useAuth(({ userId }) => userId)
    const categories = useOffersCategories(({ categories }) => categories)
    const { handlePush } = usePush()
    const dispatchMapCoordinates = useMapCoordinates(
        ({ dispatchMapCoordinates }) => dispatchMapCoordinates,
    )
    const dispatch = useBalloonCard(({ dispatch }) => dispatch)
    const dispatchVisibleBarter = useVisibleModalBarter(
        ({ dispatchVisibleBarter }) => dispatchVisibleBarter,
    )
    const { createGallery } = usePhotoVisible()

    const { id, categoryId, provider, title, userId, addresses, images, type } =
        props ?? {}

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(userId!),
        queryKey: ["user", userId],
        enabled: !!userId,
    })

    const categoryCurrent = categories?.find(
        (item) => Number(item?.id) === Number(categoryId),
    )!

    function handleCoordinates() {
        handlePush("/")
        requestAnimationFrame(() => {
            dispatchMapCoordinates({
                coordinates: addresses?.[0]?.coordinates
                    ?.split(" ")
                    ?.reverse()
                    ?.map(Number),
            })
            dispatch({
                visible: true,
                type: provider!,
                id: id,
                idUser: userId,
            })
        })
    }

    function handleBarter() {
        if (myUserId) {
            if (provider === "offer") {
                const name = `${dataUser?.res?.profile?.firstName || " "} ${
                    dataUser?.res?.profile?.lastName || " "
                }`
                const dataProfile = {
                    photo: dataUser?.res?.profile?.image?.attributes?.url!,
                    fullName: name,
                    idUser: userId!,
                }
                dispatchVisibleBarter({
                    isVisible: true,
                    dataOffer: props,
                    dataProfile: dataProfile,
                })
            }
        }
    }

    function handleImages() {
        const { type, ...data } = props ?? {}
        if (data?.images?.length) {
            createGallery(data, data?.images, data?.images[0], 0, {
                title: data?.title!,
                name: `${dataUser?.res?.profile?.firstName || ""} ${
                    dataUser?.res?.profile?.lastName || ""
                }`,
                urlPhoto: dataUser?.res?.profile?.image?.attributes?.url!,
                idUser: dataUser?.res?.id!,
                time: data?.updated!,
            })
        }
    }

    const geo = addresses && !!addresses.length && addresses[0]

    const [src, setSrc] = useState(`/svg/category/${categoryId}.svg`)

    return (
        <li
            className={styles.container}
            data-mobile={isMobile}
            data-type={type}
            onClick={handleCoordinates}
        >
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
                            event.preventDefault()
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
                                              transform: `rotate(${
                                                  (360 / images.length) * index
                                              }deg)`,
                                          }}
                                      >
                                          <div data-c />
                                      </div>
                                  ))
                                : null}
                        </div>
                        <NextImageMotion
                            data-is-length={!!images?.length}
                            src={
                                dataUser?.res?.profile?.image?.attributes?.url!
                            }
                            alt="avatar"
                            width={42}
                            height={42}
                        />
                    </div>
                    <div data-info>
                        <p>
                            {dataUser?.res?.profile?.firstName || " "}{" "}
                            {dataUser?.res?.profile?.lastName || " "}
                        </p>
                        {geo ? (
                            <GeoTagging
                                location={geo?.additional}
                                fontSize={12}
                                size={14}
                            />
                        ) : null}
                    </div>
                </div>
                <h5>{title}</h5>
                {<ButtonReplyPrimary user={dataUser?.res!} offer={props} />}
            </section>
        </li>
    )
}
