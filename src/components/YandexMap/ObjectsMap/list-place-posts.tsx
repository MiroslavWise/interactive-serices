import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Placemark } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { EnumTimesFilter } from "@/components/content/BannerServices/constants"

import { getPosts } from "@/services/posts"
import { TYPE_ICON, TYPE_ICON_URGENT } from "./constants"
import { dispatchBallonPost, useFiltersServices, useUrgentFilter } from "@/store"
import { EXCEPTION_POST_MAP } from "@/config/exception"
// import { clg } from "@console"
// import { TTypeInstantsMap } from "../types"

interface IPlacemarkCurrent {
  coordinates: [number, number][]
  post: IPosts
}

function ListPlacePosts() {
  const timesFilter = useFiltersServices(({ timesFilter }) => timesFilter)
  const providers = useFiltersServices(({ providers }) => providers)
  const urgent = useUrgentFilter(({ urgent }) => urgent)

  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    select: (data) => data?.data?.filter((item) => (!!urgent ? !!item.urgent : true)),
  })

  const items = data || []

  const marks: IPlacemarkCurrent[] = useMemo(() => {
    const array: IPlacemarkCurrent[] = []

    if (items && Array.isArray(items) && ["all", EnumTypeProvider.post].includes(providers)) {
      items?.forEach((item) => {
        if (!Array.isArray(item.addresses) || item.addresses.length === 0 || EXCEPTION_POST_MAP.includes(item.id)) {
          return
        }
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
  }, [items, timesFilter, providers])

  if (["all", EnumTypeProvider.post].includes(providers))
    return marks.map((item) => <RefPlaceMark {...item} key={`${item.post.id}-${item.post.slug}-list`} />)

  return null
}

const RefPlaceMark = (item: IPlacemarkCurrent) => (
  <Placemark
    defaultOptions={{
      iconLayout: "default#image",
      iconImageHref: item?.post?.urgent ? TYPE_ICON_URGENT[EnumTypeProvider.post] : TYPE_ICON[EnumTypeProvider.post],
      iconImageSize: [18.92 * 2, 18.92 * 2.2],
      zIndex: 45,
      zIndexActive: 50,
    }}
    defaultProperties={{
      ...item?.post,
      type: "post",
    }}
    // instanceRef={instanceRef}
    geometry={item?.coordinates[0]}
    modules={["geoObject.addon.balloon"]}
    id={`post-${item.post.id}`}
    onClick={(event: any) => {
      event.preventDefault()
      event.stopPropagation()
      dispatchBallonPost(item.post)
    }}
  />
)

ListPlacePosts.displayName = "ListPlacePosts"
export default ListPlacePosts
