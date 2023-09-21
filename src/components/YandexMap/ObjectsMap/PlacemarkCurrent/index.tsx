"use client"

import { Placemark } from "@pbe/react-yandex-maps"
import { type FC, memo, useId, useState, useEffect } from "react"

import type { IPlacemarkCurrent, TPlacemarkCurrent } from "./types"

import { usePush } from "@/helpers"
import { TYPE_ICON, BALLON_TYPE } from "./constants"
import { useAuth } from "@/store/hooks"

const PlacemarkCurrentStates: TPlacemarkCurrent = ({
    coordinates,
    title,
    id,
    idUser,
    provider,
}) => {
    return coordinates.map((item) => (
        <Place
            key={`${item[0]}-${item[1]}-${id}`}
            item={item}
            provider={provider}
            id={id}
            idUser={idUser}
            title={title}
        />
    ))
}
export const PlacemarkCurrent: TPlacemarkCurrent = memo(PlacemarkCurrentStates)

const PlaceMarkState: FC<
    Partial<IPlacemarkCurrent> & { item: [number, number] }
> = ({ title, id, item, provider, idUser }) => {
    const idPlace = useId()
    const { userId } = useAuth()
    const [isActive, setIsActive] = useState(false)
    const { handlePush } = usePush()

    useEffect(() => {
        if (isActive) {
            const buttonMessage = document.getElementById(
                `button-message-${id}-${idPlace}`,
            )
            const buttonUser = document.getElementById(`button-user-${id}`)
            if (buttonMessage) {
                buttonMessage.onclick = () => {
                    if (userId !== idUser) {
                        handlePush(`/messages?user=${idUser}`)
                    }
                }
            }
            if (buttonUser) {
                buttonUser.onclick = () => {
                    if (userId !== idUser) {
                        handlePush(`/user?id=${idUser}`)
                    }
                }
            }
        }
    }, [isActive, id, handlePush, idUser, idPlace, userId])

    const balloonContentService = `
    <div class="maps-content">
      <div class="maps-service-title-block">
        <div class="maps-photo-block">

          <div class="maps-badge-rating"><img src="/svg/star.svg" alt="start" width="12" height="12" /><p>4.5</p></div>
        </div>
        <section class="maps-about-content">
          <h3>""asd</h3>
          <a>01/02/2023</a>
          <p>${title}</p>
        </section>
      </div>
      <section class="maps-buttons">
        <div class="maps-button-circle" id="button-message-${id}-${idPlace}"><img src="/png/chat-bubbles.png" width="18" height="18" /></div>
        <div class="maps-button-circle" id="button-user-${id}-${idPlace}"><img src="/png/user-profile.png" width="18" height="18" /></div>
      </section>
    </div>
  `

    return (
        <Placemark
            geometry={item.reverse()}
            options={{
                iconLayout: "default#image",
                iconImageHref: TYPE_ICON[provider!].default || "/map/not.png",
                iconImageSize: [48, 54],
                hideIconOnBalloonOpen: false,
                zIndex: 45,
                balloonZIndex: "42",
                zIndexActive: 50,
            }}
            onClick={(e: any) => {
                setTimeout(() => {
                    if (
                        e?.originalEvent?.map?.balloon?._balloon?._state ===
                        "OPEN"
                    ) {
                        setIsActive(true)
                    } else {
                        setIsActive(false)
                    }
                }, 10)
            }}
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            properties={{
                balloonContent: ["alert", "request", "discussion"].includes(
                    provider!,
                )
                    ? BALLON_TYPE[provider!]({
                          time: "25.08.2023",
                          title: title! || "",
                          idPlace: idPlace,
                          id: id!,
                      })
                    : balloonContentService,
            }}
        />
    )
}

const Place = memo(PlaceMarkState)
