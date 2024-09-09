import { type RefObject } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import CardPost from "@/components/common/Card/CardPost"
import CardBallon from "@/components/common/Card/CardBallon"

import { useFiltersServices } from "@/store"

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

  return (
    <ul
      className="relative w-full items-start"
      data-test="ul-services-component"
      style={{
        height:
          (["all", EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers)
            ? virtualizer.getTotalSize()
            : 0) + (["all", EnumTypeProvider.post].includes(providers) ? virtualizerPost.getTotalSize() : 0),
      }}
    >
      <div
        className="absolute top-0 left-0 w-full flex flex-col *:mt-2.5 pb-2.5"
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
        {["all", EnumTypeProvider.post].includes(providers)
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
