import { useMemo } from "react"
import { Virtuoso } from "react-virtuoso"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { dis } from "@/utils/distance"
import { JSONStringBounds } from "@/utils/map-sort"
import { useBounds, useFiltersServices } from "@/store"

interface IProps {
  list: IResponseOffers[]
  listPosts: IPosts[]
}

function VirtualList({ list, listPosts }: IProps) {
  const count = list.length
  const countPost = listPosts.length
  const providers = useFiltersServices(({ providers }) => providers)

  const isAll = providers === "all"
  const isOffersAnd = [EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers as EnumTypeProvider)
  const isPosts = EnumTypeProvider.POST === providers

  const bounds = useBounds(({ bounds }) => bounds)
  const stringJSON = JSONStringBounds(bounds)

  interface IListAll {
    type: EnumTypeProvider
    item?: IPosts | IResponseOffers
  }

  const listAll = useMemo(() => {
    const obj: IListAll[] = []

    if (isAll) {
      for (const item of list) {
        obj.push({
          type: item.provider,
          item: item,
        })
      }
      for (const item of listPosts) {
        obj.push({
          type: EnumTypeProvider.POST,
          item: item,
        })
      }
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
  }, [isAll, list, listPosts, stringJSON])

  const totalCount = isAll ? listAll.length : isOffersAnd ? count : isPosts ? countPost : 0
  const data: IListAll[] = isAll
    ? listAll
    : isOffersAnd
    ? list.map((item) => ({
        type: item.provider,
        item: item,
      }))
    : isPosts
    ? listPosts.map((item) => ({
        type: EnumTypeProvider.POST,
        item: item,
      }))
    : []

  return (
    <ul className="relative w-full h-full resize" data-test="ul-services-component">
      <Virtuoso
        totalCount={totalCount}
        data={data}
        overscan={{
          main: 1200,
          reverse: 1200,
        }}
        increaseViewportBy={{
          top: 1280,
          bottom: 1280,
        }}
        className="scroll-no scroll-no-children"
        itemContent={(_, item) =>
          [EnumTypeProvider.alert, EnumTypeProvider.offer].includes(item.type) ? (
            <CardBallon key={`:k:of:${item?.item?.id!}:l:`} offer={item?.item! as IResponseOffers} className="mt-4" />
          ) : item.type === EnumTypeProvider.POST ? (
            <CardPost key={`:k:p:${item?.item?.id!}:a:`} post={item?.item! as IPosts} className="mt-4" />
          ) : null
        }
      />
    </ul>
  )
}

VirtualList.displayName = "VirtualList"
export default VirtualList
