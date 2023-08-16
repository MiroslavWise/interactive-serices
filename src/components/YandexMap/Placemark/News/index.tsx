"use client"

import { useEffect, useRef, useState } from "react"
import { useYMaps } from "@pbe/react-yandex-maps"
import { PLACEMARKs } from "@/mocks/components/YandexMap/constants"

export const NewsPlaceMark = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const ymaps = useYMaps([
    "Map",
    "option.Manager",
    "option.presetStorage",
    "Placemark",
    "templateLayoutFactory",
    "Balloon",
  ])

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.75, 37.67],
      zoom: 15,
    })

    PLACEMARKs.forEach((item) => {
      const placemark = new ymaps.Placemark(
        [...item.coordinates],
        {
        },
        {
          iconLayout: "default#image",
          iconImageHref: item.image,
          iconImageSize: item.size,
        }
      )
      placemark.events.add("click", () => {
        placemark.balloon.open(item.coordinates!, {})
        console.log("placemark.events.add: ")
        const coordinates = placemark.geometry?.getCoordinates()
        console.log(":getOptions:", map.balloon.getOptions())
        map.balloon.open(coordinates!, {
          offsetTop: 81,
        }
        )
      })
      map.geoObjects.add(placemark)
    })
  }, [ymaps])

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
}


function CustomBalloonContent({ content }: { content: any }) {
  return (
    <div className="custom-balloon-content">
      {content}
    </div>
  )
}