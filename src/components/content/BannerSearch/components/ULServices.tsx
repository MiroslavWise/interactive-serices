import { memo, useMemo } from "react"

import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { EnumTypeProvider } from "@/types/enum"

import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { useBounds } from "@/store"
import { dis } from "@/utils/distance"
import { JSONStringBounds, mapSort } from "@/utils/map-sort"

interface IProps {
  posts: IPosts[]
  offers: IResponseOffers[]
  categories: IResponseOffersCategories[]
}

interface IListAll {
  type: EnumTypeProvider
  item?: IPosts | IResponseOffers
}

function ULServices({ posts, offers }: IProps) {
  const bounds = useBounds(({ bounds }) => bounds)
  const stringBounds = JSONStringBounds(bounds)

  const locationOffers = useMemo(() => (!!bounds ? mapSort({ bounds: bounds!, items: offers }).slice(0, 45) : []), [offers, stringBounds])
  const locationPosts = useMemo(() => (!!bounds ? mapSort({ bounds: bounds!, items: posts }).slice(0, 45) : []), [posts, stringBounds])

  const listAll = useMemo(() => {
    const obj: IListAll[] = []

    for (const item of locationOffers) {
      obj.push({
        type: item.provider,
        item: item,
      })
    }
    for (const item of locationPosts) {
      obj.push({
        type: EnumTypeProvider.POST,
        item: item,
      })
    }

    obj.sort((a, b) => {
      const addressA = a?.item?.addresses?.[0]
      const addressB = b?.item?.addresses?.[0]
      const coordinatesA = addressA?.coordinates?.split(" ")?.map(Number)?.filter(Boolean) ?? [0, 0]
      const coordinatesB = addressB?.coordinates?.split(" ")?.map(Number)?.filter(Boolean) ?? [0, 0]

      if (bounds) {
        const dA = dis({ bounds, mapPoint: coordinatesA })
        const dB = dis({ bounds, mapPoint: coordinatesB })

        if (typeof dA !== "number" || typeof dB !== "number") return 0

        return dA - dB
      }

      return 0
    })

    return obj
  }, [locationOffers, locationPosts, stringBounds])

  return (
    <section data-test="ul-search-filters" className="w-full py-2 px-5 flex flex-col overflow-y-auto overflow-x-hidden gap-2">
      {listAll.map(({ type, item }) => {
        if ([EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(type))
          return <CardBallon key={`:s:c:x:Z:a:offer-${item?.id!}`} offer={item as IResponseOffers} />
        if (type === EnumTypeProvider.POST)
          return <CardPost key={`:k:p:${item?.id!}:a:`} post={item! as IPosts} className="mt-4 last:mb-4" />
        return null
      })}
    </section>
  )
}

export default memo(ULServices)
