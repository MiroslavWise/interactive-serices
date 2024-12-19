import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Placemark, useYMaps } from "@pbe/react-yandex-maps"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import { getPosts } from "@/services/posts"
import { iconPost } from "@/utils/map/icon-post"
import { dispatchBallonPost, useFiltersServices, useUrgentFilter } from "@/store"

interface IPlacemarkCurrent {
  coordinates: number[]
  post: IPosts
}

function ListPlacePosts() {
  const providers = useFiltersServices(({ providers }) => providers)
  const urgent = useUrgentFilter(({ urgent }) => urgent)

  const { data } = useQuery({
    queryFn: () => getPosts({ order: "DESC" }),
    queryKey: ["posts", { order: "DESC" }],
    select: (data) => data?.data?.filter((item) => (!!urgent ? !!item.urgent : true)),
  })

  const items = data || []

  if (["all", EnumTypeProvider.POST].includes(providers))
    return items.map((item) => {
      const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map(Number)

      if (Array.isArray(coordinates)) return <RefPlaceMark coordinates={coordinates} post={item} key={`${item.id}-${item.slug}-list`} />

      return null
    })

  return null
}

const RefPlaceMark = (item: IPlacemarkCurrent) => {
  const ymaps = useYMaps(["templateLayoutFactory", "layout.ImageWithContent"])

  const temp = useMemo(() => {
    if (!ymaps) return undefined

    return ymaps.templateLayoutFactory.createClass(iconPost(item?.post?.title!, item?.post?.created!, item?.post?.id!))
  }, [ymaps, item])

  return (
    <Placemark
      options={{
        iconLayout: temp,
        iconImageSize: [18.92 * 2, 18.92 * 2.2],
        zIndex: 45,
        zIndexActive: 50,
      }}
      geometry={item?.coordinates}
      modules={["geoObject.addon.balloon"]}
      id={`post-${item.post.id}`}
      onClick={(event: any) => {
        event.preventDefault()
        event.stopPropagation()
        dispatchBallonPost(item.post)
      }}
    />
  )
}

ListPlacePosts.displayName = "ListPlacePosts"
export default ListPlacePosts
