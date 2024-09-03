import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

import { TYPE_ICON } from "./constants"
import { getPosts } from "@/services/posts"
import { dispatchBallonPost, useFiltersServices } from "@/store"

interface IPlacemarkCurrent {
  coordinates: [number, number][]
  post: IPosts
}

function ListPlacePosts() {
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)

  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
  })

  const items = data?.data || []

  const marks: IPlacemarkCurrent[] = useMemo(() => {
    const array: IPlacemarkCurrent[] = []

    if (items && Array.isArray(items)) {
      items
        ?.filter((item) => Array.isArray(item?.addresses) && item?.addresses?.length)
        ?.forEach((item) => {
          const coordinates: [number, number][] = item?.addresses?.map((_item) => {
            if (_item.coordinates) {
              const split = _item.coordinates.split(" ")
              return [Number(split[0]), Number(split[1])]
            }
            return [0, 0]
          })

          if (timesFilter === EnumTimesFilter.ALL) {
            array.push({
              coordinates: coordinates,
              post: item,
            })
          } else {
            const day = 86_400_000
            const week = day * 7
            const month = day * 31

            const objTime = {
              [EnumTimesFilter.DAYS]: day,
              [EnumTimesFilter.WEEK]: week,
              [EnumTimesFilter.MONTH]: month,
            }

            const time = new Date(item.created).valueOf()
            const now = new Date().valueOf()

            if (time + objTime[timesFilter] - now > 0) {
              array.push({
                coordinates: coordinates,
                post: item,
              })
            }
          }
        })
    }

    return array
  }, [items, timesFilter])

  return marks.map((item) => (
    <Placemark
      key={`${item.post.id}-${item.post.slug}-list`}
      geometry={item?.coordinates[0]}
      modules={["geoObject.addon.balloon"]}
      properties={{ ...item?.post }}
      options={{
        iconLayout: "default#image",
        iconImageHref: TYPE_ICON[EnumTypeProvider.post],
        iconImageSize: [18.92 * 2, 18.92 * 2.2],
        zIndex: 45,
        zIndexActive: 50,
      }}
      onClick={(event: any) => {
        event.preventDefault()
        event.stopPropagation()
        dispatchBallonPost(item.post)
      }}
    />
  ))
}

ListPlacePosts.displayName = "ListPlacePosts"
export default ListPlacePosts
