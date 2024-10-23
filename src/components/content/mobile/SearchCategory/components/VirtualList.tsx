import { type RefObject } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import CardBallon from "@/components/common/Card/CardBallon"

import { useFiltersServices } from "@/store"
import CardPost from "@/components/common/Card/CardPost"

interface IProps {
  parentRef: RefObject<HTMLUListElement>
  list: IResponseOffers[]
  listPosts: IPosts[]
}

function VirtualList({ parentRef, list, listPosts }: IProps) {
  const providers = useFiltersServices(({ providers }) => providers)
  const count = list.length
  const countPost = listPosts.length

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
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

  return (
    <ul
      className="w-full relative h-full"
      style={{
        height:
          (["all", EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers)
            ? virtualizer.getTotalSize()
            : 0) + (["all", EnumTypeProvider.POST].includes(providers) ? virtualizerPost.getTotalSize() : 0),
      }}
    >
      <div
        className="absolute p-5 pt-1 top-0 left-0 w-full flex flex-col *:mt-2.5 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)]"
        style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }}
      >
        {["all", EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers)
          ? items.map((virtualRow) => (
              <CardBallon
                key={`:key:${virtualRow.key}:`}
                offer={list[virtualRow.index]}
                dataIndex={virtualRow.index}
                ref={virtualizer.measureElement}
              />
            ))
          : null}
        {["all", EnumTypeProvider.POST].includes(providers)
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
export default VirtualList
