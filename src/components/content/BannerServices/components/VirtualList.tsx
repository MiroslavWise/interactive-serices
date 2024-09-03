import { type RefObject } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

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
    count: count + countPost,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 270,
    enabled: true,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <ul className="relative w-full items-start" data-test="ul-services-component" style={{ height: virtualizer.getTotalSize() }}>
      <div
        className="absolute top-0 left-0 w-full flex flex-col *:mt-2.5 pb-2.5"
        style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }}
      >
        {items.map((virtualRow) => (
          <CardBallon
            key={`:key:${virtualRow.key}:`}
            offer={list[virtualRow.index]}
            dataIndex={virtualRow.index}
            ref={virtualizer.measureElement}
          />
        ))}
      </div>
    </ul>
  )
}

VirtualList.displayName = "VirtualList"
export default VirtualList
