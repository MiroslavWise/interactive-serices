import { memo, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import { ImageCategory } from "@/components/common"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"
import { dispatchDataFilterScreen } from "@/store"

function ActiveFilters({ activeFilters }: { activeFilters: number[] }) {
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.data || []

  function deleteCategories(id: number) {
    dispatchDataFilterScreen(activeFilters?.filter((item) => item !== id))
  }

  const itemCategory = useCallback((id: number) => categories.find((item) => item.id === id), [categories])

  return (
    <div data-filters-category className="flex-wrap gap-1">
      {activeFilters.map((item) => (
        <a
          key={`::key::item::filter::category::${item}::`}
          className={cx(
            "flex flex-row items-center gap-1 p-1 pr-1.5 h-8 rounded-2xl",
            itemCategory(item)?.slug === "kursk" ? "[background:var(--more-red-gradient)]" : "[background:var(--more-blue-gradient)]",
          )}
        >
          <div className="relative w-6 h-6 p-3 rounded-full bg-BG-icons *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
            <ImageCategory id={item} slug={itemCategory(item)?.slug} provider={itemCategory(item)?.provider} />
          </div>
          <span className="text-text-button text-xs text-ellipsis line-clamp-1 whitespace-nowrap font-medium">
            {itemCategory(item) ? itemCategory(item)?.title : null}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              deleteCategories(item)
            }}
            className="w-4 h-4 border-none outline-none relative bg-transparent *:absolute *:w-4 *:h-4 *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 [&>svg>path]:stroke-text-button"
          >
            <IconSprite id="x-close-20-20" />
          </button>
        </a>
      ))}
    </div>
  )
}

ActiveFilters.displayName = "ActiveFilters"
export default memo(ActiveFilters)
