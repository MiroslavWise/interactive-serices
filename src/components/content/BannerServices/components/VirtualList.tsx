import { useMemo } from "react"
import { Virtuoso } from "react-virtuoso"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { clg } from "@console"
import { getMillisecond } from "@/helpers"
import { useFiltersServices } from "@/store"

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

  interface IListAll {
    type: EnumTypeProvider
    post?: IPosts
    offer?: IResponseOffers
  }

  const listAll = useMemo(() => {
    const obj: IListAll[] = []

    if (isAll) {
      for (const item of list) {
        obj.push({
          type: item.provider,
          offer: item,
        })
      }
      for (const item of listPosts) {
        obj.push({
          type: EnumTypeProvider.POST,
          post: item,
        })
      }
    }

    // obj.sort(
    //   (a, b) =>
    //     getMillisecond(
    //       b?.type === EnumTypeProvider.POST
    //         ? b?.post?.created
    //         : [EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(b.type)
    //         ? b?.offer?.created
    //         : undefined,
    //     ) -
    //     getMillisecond(
    //       a?.type === EnumTypeProvider.POST
    //         ? a?.post?.created
    //         : [EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(a.type)
    //         ? a?.offer?.created
    //         : undefined,
    //     ),
    // )

    return obj
  }, [isAll, list, listPosts])

  const totalCount = isAll ? listAll.length : isOffersAnd ? count : isPosts ? countPost : 0
  const data: IListAll[] = isAll
    ? listAll
    : isOffersAnd
    ? list.map((item) => ({
        type: item.provider,
        offer: item,
      }))
    : isPosts
    ? listPosts.map((item) => ({
        type: EnumTypeProvider.POST,
        post: item,
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
        itemContent={(_, item) => {
          if ([EnumTypeProvider.discussion, EnumTypeProvider.alert, EnumTypeProvider.offer].includes(item.type))
            return <CardBallon key={`:k:of:${item?.offer?.id!}:l:`} offer={item?.offer!} className="mt-4 last:mb-4" />

          if (item.type === EnumTypeProvider.POST)
            return <CardPost key={`:k:p:${item?.post?.id!}:a:`} post={item?.post!} className="mt-4 last:mb-4" />

          return null
        }}
      />
    </ul>
  )
}

VirtualList.displayName = "VirtualList"
export default VirtualList
