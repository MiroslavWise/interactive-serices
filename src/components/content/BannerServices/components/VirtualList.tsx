import { memo, useMemo, type RefObject } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { useFiltersServices } from "@/store"
import { getMillisecond } from "@/helpers"

interface IProps {
  parentRef: RefObject<HTMLUListElement>
  list: IResponseOffers[]
  listPosts: IPosts[]
}

function VirtualList({ parentRef, list, listPosts }: IProps) {
  const count = list.length
  const countPost = listPosts.length
  const providers = useFiltersServices(({ providers }) => providers)

  const virtualizer = useVirtualizer({
    count: count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 270,
    enabled: true,
  })
  const virtualizerPost = useVirtualizer({
    count: countPost,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 270,
    enabled: true,
  })

  const items = virtualizer.getVirtualItems()
  const itemsPost = virtualizerPost.getVirtualItems()

  const isAll = providers === "all"
  const isOffersAnd = [EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers as EnumTypeProvider)
  const isPosts = EnumTypeProvider.post === providers

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
          type: EnumTypeProvider.post,
          post: item,
        })
      }
    }

    obj.sort(
      (a, b) =>
        getMillisecond(
          b?.type === EnumTypeProvider.post
            ? b?.post?.created
            : [EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(b.type)
            ? b?.offer?.created
            : undefined,
        ) -
        getMillisecond(
          a?.type === EnumTypeProvider.post
            ? a?.post?.created
            : [EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(a.type)
            ? a?.offer?.created
            : undefined,
        ),
    )

    return obj
  }, [isAll, list, listPosts])

  const virtualizerAll = useVirtualizer({
    count: listAll.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 240,
    enabled: true,
  })
  const itemsAll = virtualizerAll.getVirtualItems()

  return (
    <ul
      className="relative w-full items-start"
      data-test="ul-services-component"
      style={{
        height: isAll
          ? virtualizerAll.getTotalSize()
          : isOffersAnd
          ? virtualizer.getTotalSize()
          : isPosts
          ? virtualizerPost.getTotalSize()
          : 0,
      }}
    >
      <div
        className="absolute top-0 left-0 w-full flex flex-col *:mt-2.5 pb-2.5"
        style={{
          transform: `translateY(${isAll ? itemsAll[0]?.start : isOffersAnd ? items[0]?.start : isPosts ? itemsPost[0]?.start : 0}px)`,
        }}
      >
        {isAll
          ? itemsAll.map((virtualRow) =>
              listAll[virtualRow.index].type === EnumTypeProvider.post ? (
                <CardPost
                  key={`:key:${virtualRow.key}:all:`}
                  post={listAll[virtualRow.index]?.post!}
                  dataIndex={virtualRow.index}
                  ref={virtualizer.measureElement}
                />
              ) : [EnumTypeProvider.offer, EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(listAll[virtualRow.index].type) ? (
                <CardBallon
                  key={`:key:${virtualRow.key}:all:`}
                  offer={listAll[virtualRow.index]?.offer!}
                  dataIndex={virtualRow.index}
                  ref={virtualizer.measureElement}
                />
              ) : null,
            )
          : null}
        {isOffersAnd
          ? items.map((virtualRow) => (
              <CardBallon
                key={`:key:${virtualRow.key}:`}
                offer={list[virtualRow.index]}
                dataIndex={virtualRow.index}
                ref={virtualizer.measureElement}
              />
            ))
          : null}
        {isPosts
          ? itemsPost.map((virtualRow) => (
              <CardPost
                key={`:key:${virtualRow.key}:post:`}
                post={listPosts[virtualRow.index]}
                dataIndex={virtualRow.index}
                ref={virtualizer.measureElement}
              />
            ))
          : null}
      </div>
    </ul>
  )
}

VirtualList.displayName = "VirtualList"
export default memo(VirtualList)
