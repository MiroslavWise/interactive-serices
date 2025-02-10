import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"

import { ImageCategory } from "@/components/common"
import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
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

  if (activeFilters.length > 0 && providers === EnumTypeProvider.offer)
    return (
      <div data-filters-category data-test="filters-category-banner-services" className="w-full flex flex-row items-start">
        {activeFilters.map((item) => (
          <a
            key={`::key::item::filter::category::${item}::`}
            data-test={`a-filters-category-banner-service-${item}`}
            // className={cx(
            //   itemCategory(item)?.slug === "kursk" ? "[background:var(--more-red-gradient)]" : "[background:var(--more-blue-gradient)]",
            // )}
          >
            <div data-icon className="relative *:w-4 *:h-4 *:rounded-sm">
              <ImageCategory id={item} slug={itemCategory(item)?.slug} provider={itemCategory(item)?.provider} />
            </div>
            <span>{itemCategory(item) ? itemCategory(item)?.title : null}</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                deleteCategories(item)
              }}
              className="relative w-4 h-4 p-2"
            >
              <IconSprite id="x-close-20-20" className="w-4 h-4" />
            </button>
          </a>
        ))}
      </div>
    )

  return null
}

ActiveFilters.displayName = "ActiveFilters"
export default ActiveFilters
