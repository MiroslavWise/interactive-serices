import { type TServicesFilter } from "../types/types"

import { cx } from "@/lib/cx"
import { SERVICES } from "../constants"
import { dispatchFiltersServiceProvider, useFiltersServices } from "@/store"

function ServiceFilters() {
  const providers = useFiltersServices(({ providers }) => providers)
  function handleProvider(value: TServicesFilter) {
    dispatchFiltersServiceProvider(value)
  }
  return (
    <div data-filters-services className="gap-[1.125rem] w-full flex flex-row items-start justify-start flex-nowrap">
      {SERVICES.map((item) => (
        <a
          key={`::key::item::provider::${item.value}::`}
          data-active={providers === item.value}
          onClick={(event) => {
            event.stopPropagation()
            handleProvider(item.value)
          }}
          data-test={`services-a-banner-services-${item.value}`}
          className={cx("relative cursor-pointer", providers === item.value ? "[&>span]:text-text-accent" : "[&>span]:text-text-secondary")}
        >
          <span className="text-center text-sm font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  )
}

ServiceFilters.displayName = "ServiceFilters"
export default ServiceFilters
