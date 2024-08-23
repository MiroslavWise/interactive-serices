"use client"

import { type ISmallDataOfferBarter } from "@/services/barters/types"

import { ImageCategory } from "../../Image"

interface IBadgeServices extends ISmallDataOfferBarter {
  isClickable?: boolean
}

export const BadgeServices = (props: IBadgeServices) => {
  const { categoryId, category, id, isClickable } = props ?? {}

  function handle() {
    if (id && isClickable) {
    }
  }

  return (
    <li
      className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-1 max-w-full py-1 pl-1 pr-1.5 rounded-2xl h-8 bg-grey-field border border-solid border-grey-stroke-light cursor-pointer"
      onClick={handle}
    >
      <div className="relative w-6 h-6 rounded-full bg-BG-icons overflow-hidden p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:aspect-square *:w-4 *:h-4">
        <ImageCategory id={categoryId!} slug={category?.slug} provider={category?.provider} />
      </div>
      <p className="text-text-primary text-ellipsis text-[0.8125rem] leading-4 line-clamp-1 whitespace-nowrap">
        {category?.title! || "---{}---"}
      </p>
    </li>
  )
}
