import { create } from "zustand"

import { EnumTimesFilter } from "@/components/content/BannerServices/constants"
import { TServicesFilter } from "@/components/content/BannerServices/types/types"

export const useFiltersServices = create<IFilterServices>(() => ({
  timesFilter: EnumTimesFilter.ALL,
  providers: "all",
}))

export const dispatchFiltersServiceTime = (value: EnumTimesFilter) => useFiltersServices.setState((_) => ({ ..._, timesFilter: value }))
export const dispatchFiltersServiceProvider = (value: TServicesFilter) => useFiltersServices.setState((_) => ({ ..._, providers: value }))

interface IFilterServices {
  timesFilter: EnumTimesFilter
  providers: TServicesFilter
}
