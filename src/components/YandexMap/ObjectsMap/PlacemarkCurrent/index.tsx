"use client"

import { Placemark, useYMaps } from "@pbe/react-yandex-maps"

import type { TPlacemarkCurrent } from "./types"
import { useEffect, useRef, useState } from "react"
import { usePush } from "@/helpers/hooks/usePush"

export const PlacemarkCurrent: TPlacemarkCurrent = ({
    coordinates,
    image,
    icon,
    size,
    about,
    id,
    name,
    userId,
}) => {
    const { handlePush } = usePush()
    const [isActive, setIsActive] = useState(false)
    const ymaps = useYMaps([
        "geolocation",
        "GeocodeResult",
        "GeoObject",
        "util.defineClass",
        "Placemark",
        "Balloon",
    ])

    useEffect(() => {}, [ymaps])

    function onClick(a: any, b: any) {
        console.log("a: , ", a, "b: , ", b)
    }

    useEffect(() => {
        if (isActive) {
            const buttonHistory = document.getElementById(
                `button-on-history-${id}`,
            )
            const buttonMessage = document.getElementById(
                `button-message-${id}`,
            )
            const buttonUser = document.getElementById(`button-user-${id}`)
            console.log("buttonHistory: ", buttonHistory)
            if (buttonHistory) {
                buttonHistory.onclick = () => onClick(1, id)
            }
            if (buttonMessage) {
                buttonMessage.onclick = () => {
                    handlePush(`/messages?user=${userId}`)
                }
            }
            if (buttonUser) {
                buttonUser.onclick = () => {
                    handlePush(`/user?id=${userId}`)
                }
            }
        }
    }, [isActive, id, handlePush, userId])

    const balloonContentService = `
    <div class="maps-content">
      <div class="maps-service-title-block">
        <div class="maps-photo-block">
          <img src="${
              image.url ? image.url : "/png/default_avatar.png"
          }" alt="avatar" width="400" height="400" class="maps-avatar">
          <div class="maps-badge-rating"><img src="/svg/star.svg" alt="start" width="12" height="12" /><p>4.5</p></div>
        </div>
        <section class="maps-about-content">
          <h3>${name}</h3>
          <a>01/02/2023</a>
          <p>${about}</p>
        </section>
      </div>
      <section class="maps-buttons">
        <div class="button-fill secondary" id="button-on-history-${id}"><span>Перейти к истории</span></div>
        <div class="maps-button-circle" id="button-message-${id}"><img src="/png/chat-bubbles.png" width="18" height="18" /></div>
        <div class="maps-button-circle" id="button-user-${id}"><img src="/png/user-profile.png" width="18" height="18" /></div>
      </section>
    </div>
  `

    return (
        <Placemark
            key={`${coordinates[0]}`}
            geometry={coordinates}
            options={{
                iconLayout: "default#image",
                iconImageHref: icon,
                iconImageSize: size,
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
            properties={{ balloonContent: balloonContentService }}
        />
    )
}
