import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { ImageCategory } from "@/components/common"

import { dispatchDataFilterScreen, dispatchVisibleSearchFilters } from "@/store"

interface IProps {
  category: IResponseOffersCategories
}

function ComponentCategory({ category }: IProps) {
  const { id, provider, slug, title } = category ?? {}

  return (
    <li
      key={`:d:s:A:-${id}:`}
      className="w-full flex flex-col gap-1.5 items-center cursor-pointer"
      onClick={() => {
        dispatchDataFilterScreen([id])
        dispatchVisibleSearchFilters(false)
      }}
    >
      <div className="rounded-full w-11 h-11 bg-grey-field flex items-center justify-center *:w-6 *:h-6 p-2.5">
        <ImageCategory id={id} provider={provider} slug={slug} />
      </div>
      <span className="text-[0.8125rem] leading-4 text-center text-text-primary line-clamp-2 text-ellipsis">{title}</span>
    </li>
  )
}

ComponentCategory.displayName = "ComponentCategory"
export default ComponentCategory
