import { type RefObject } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { type IResponseOffers } from "@/services/offers/types"
import CardBallon from "@/components/common/Card/CardBallon"

interface IProps {
  parentRef: RefObject<HTMLUListElement>
  list: IResponseOffers[]
}

function VirtualList({ parentRef, list }: IProps) {
  const count = list.length

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    enabled: true,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <ul className="w-full relative h-full" style={{}}>
      <div
        className="absolute p-5 pt-1 top-0 left-0 w-full flex flex-col *:mt-2.5 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)]"
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
