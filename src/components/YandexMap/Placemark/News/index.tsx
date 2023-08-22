"use client"

import { useEffect, useRef, useState } from "react"
import { Placemark, useYMaps } from "@pbe/react-yandex-maps"
import { PLACEMARKs } from "@/mocks/components/YandexMap/constants"

export const NewsPlaceMark = () => {

  return PLACEMARKs.map(item => <Placemark
    key={`${item.coordinates[0]}`}
    geometry={item.coordinates}
    options={{
      iconLayout: "default#image",
      iconImageHref: item.image,
      iconImageSize: item.size,
    }}
  />)
}