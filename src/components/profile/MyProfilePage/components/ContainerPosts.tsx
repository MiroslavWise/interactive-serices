import { useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import ItemPost from "./ItemPost"

import { nameTitle } from "@/lib/names"
import { cx } from "@/lib/cx"

interface IProps {
  posts: IPosts[]
}

const NAV: { value: boolean; label: string }[] = [
  {
    label: "Активные",
    value: false,
  },
  {
    label: "В архиве",
    value: true,
  },
]

function ContainerPosts({ posts }: IProps) {
  const [isArchive, setIsArchive] = useState(false)

  const list = posts.filter((_) => _.archive === isArchive)
  const length = list.length

  return (
    <section className="w-full overflow-y-visible h-fit flex flex-col items-start gap-2.5">
      <nav className="w-full border-b border-solid border-grey-stroke flex flex-row justify-start gap-[1.125rem]">
        {NAV.map((item) => (
          <a
            key={`:NAV:${item.value}`}
            className={cx(
              "w-fit pb-1 border-b-2 border-solid cursor-pointer",
              item.value === isArchive ? "border-text-accent" : "border-transparent",
            )}
            onClick={() => setIsArchive(item.value)}
          >
            <span className={cx("text-sm font-medium", item.value === isArchive ? "text-text-accent" : "text-text-secondary")}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
      <p className="text-text-secondary text-sm font-medium text-left">
        {length} {nameTitle(length, EnumTypeProvider.POST)}
      </p>
      {length > 0 ? (
        <ul className="w-full grid grid-cols-3 max-2xl:grid-cols-2 max-xl:grid-cols-1 z-10 pb-5 gap-2.5 md:gap-4">
          {list.map((item) => (
            <ItemPost key={`:key:post:${item.id}:`} post={item} />
          ))}
        </ul>
      ) : (
        <section className="w-full flex items-center justify-center h-full pt-24">
          <p className="text-text-primary text-sm font-normal">{isArchive ? "Архивированных" : "Активных"} постов нет</p>
        </section>
      )}
    </section>
  )
}

ContainerPosts.displayName = "ContainerPosts"
export default ContainerPosts
