import { memo, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"
import { dispatchDataFilterScreen } from "@/store"

function ActiveFilters({ activeFilters }: { activeFilters: number[] }) {
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []
  function deleteCategories(id: number) {
    dispatchDataFilterScreen(activeFilters?.filter((item) => item !== id))
  }

  const itemCategory = useCallback((id: number) => categories.find((item) => item.id === id), [categories])

  return (
    <div data-filters-category data-test="filters-category-banner-services" className="w-full flex flex-row items-start">
      {activeFilters.map((item) => (
        <a
          key={`::key::item::filter::category::${item}::`}
          data-test={`a-filters-category-banner-service-${item}`}
          className={cx(
            itemCategory(item)?.slug === "kursk" ? "[background:var(--more-red-gradient)]" : "[background:var(--more-blue-gradient)]",
          )}
        >
          <div data-icon>
            <ImageCategory id={item} slug={itemCategory(item)?.slug} />
          </div>
          <span>{itemCategory(item) ? itemCategory(item)?.title : null}</span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              deleteCategories(item)
            }}
          >
            <IconXClose />
          </button>
        </a>
      ))}
    </div>
  )
}

ActiveFilters.displayName = "ActiveFilters"
export default memo(ActiveFilters)
