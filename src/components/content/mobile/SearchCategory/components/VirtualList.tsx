import { useMemo, type RefObject } from "react"
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

  const all = useMemo(() => {
    const array = [
      ...(["all", EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers)
        ? items.map((item, index) => ({
            type: "offer",
            createAt: list[index].created,
            item: item,
            index: index,
          }))
        : []),
      ...(["all", EnumTypeProvider.POST].includes(providers)
        ? itemsPost.map((item, index) => ({
            type: "post",
            createAt: listPosts[index].created,
            item: item,
            index: index,
          }))
        : []),
    ]

    return array.sort((prev, next) => {
      const prevNumber = getMillisecond(prev?.createAt)
      const nextNumber = getMillisecond(next?.createAt)

      return nextNumber - prevNumber
    })
  }, [items, itemsPost, list, listPosts, providers])

  const virtualizerAll = useVirtualizer({
    count: all.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 270,
    enabled: true,
  })
  const itemsAll = virtualizerAll.getVirtualItems()

  return (
    <ul
      className="w-full relative h-full"
      style={{
        height:
          providers === "all"
            ? virtualizer.getTotalSize() + virtualizerPost.getTotalSize()
            : [EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers)
            ? virtualizer.getTotalSize()
            : providers === EnumTypeProvider.POST
            ? virtualizerPost.getTotalSize()
            : 0,
      }}
    >
      <div
        className="absolute p-5 pt-1 top-0 left-0 w-full flex flex-col *:mt-2.5 pb-[calc(var(--height-mobile-footer-nav)_+_2.875rem)]"
        style={{ transform: `translateY(${all[0]?.item?.start ?? 0}px)` }}
      >
        {providers === "all"
          ? itemsAll.map((row) => {
              if (all[row.index].type === "offer")
                return (
                  <CardBallon
                    key={`:key:${row.key}:`}
                    offer={list[all[row.index].index]}
                    dataIndex={row.index}
                    ref={virtualizerAll.measureElement}
                  />
                )
              if (all[row.index].type === "post")
                return (
                  <CardPost
                    key={`:key:${row.key}:post:`}
                    post={listPosts[all[row.index].index]}
                    dataIndex={row.index}
                    ref={virtualizerAll.measureElement}
                  />
                )
              return null
            })
          : [EnumTypeProvider.offer, EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(providers)
          ? items.map((row) => (
              <CardBallon key={`:key:${row.key}:`} offer={list[row.index]} dataIndex={row.index} ref={virtualizer.measureElement} />
            ))
          : providers === EnumTypeProvider.POST
          ? itemsPost.map((row) => (
              <CardPost
                key={`:key:${row.key}:post:`}
                post={listPosts[row.index]}
                dataIndex={row.index}
                ref={virtualizerPost.measureElement}
              />
            ))
          : null}
      </div>
    </ul>
  )
}

VirtualList.displayName = "VirtualList"
export default VirtualList
