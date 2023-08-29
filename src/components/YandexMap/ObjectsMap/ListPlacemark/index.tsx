"use client"

import { useId, useMemo } from "react"
import { useQuery } from "react-query"

import type { IPlacemarkCurrent } from "../PlacemarkCurrent/types"

import { PlacemarkCurrent } from "../PlacemarkCurrent"

import { randomArrayTwoNumber } from "@/lib/random"
import { profileService } from "@/services/profile"

export const ListPlacemark = () => {
  const idPlace = useId()
  const { data, isLoading, error } = useQuery(["profiles"], () => profileService.getProfiles({ limit: 20 }))

  const marks: IPlacemarkCurrent[] = useMemo(() => {
    const array: IPlacemarkCurrent[] = []

    if (data?.res) {
      data?.res?.forEach((item, index) => {
        array.push({
          name: `${item?.firstName || "Имя"} ${item?.lastName || "Фамилия"}`,
          about: item?.about || "",
          image: {
            url: item?.image?.attributes?.url,
          },
          icon: Math.random() < 0.5 ? "/map/size=small&type=News.png" : "/map/size=small&type=Alert.png",
          coordinates: randomArrayTwoNumber(),
          size: [72, 81],
          id: `${index}-${idPlace}`,
          userId: item?.userId,
        })
      })
    }

    return array
  }, [data?.res])
  
  return marks.map(item => <PlacemarkCurrent key={item.id} {...item} />)
}