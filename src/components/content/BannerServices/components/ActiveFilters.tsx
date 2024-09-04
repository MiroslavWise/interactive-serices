import { memo, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import { ImageCategory } from "@/components/common"
import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { EnumTypeProvider } from "@/types/enum"
import { getOffersCategories } from "@/services"
import { dispatchDataFilterScreen, useFiltersScreen, useFiltersServices } from "@/store"

function ActiveFilters() {
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const providers = useFiltersServices(({ providers }) => providers)
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.data || []
  function deleteCategories(id: number) {
    dispatchDataFilterScreen(activeFilters?.filter((item) => item !== id))
  }

  const itemCategory = useCallback((id: number) => categories.find((item) => item.id === id), [categories])

  if (activeFilters.length && ["all", EnumTypeProvider.offer].includes(providers)) return null

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
