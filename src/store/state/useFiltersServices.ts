import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { EnumTimesFilter } from "@/components/content/BannerServices/constants"
import { TServicesFilter } from "@/components/content/BannerServices/types/types"
import { EnumHelper } from "@/types/enum"

export const useFiltersServices = create(
  persist<IFilterServices>(
    () => ({
      timesFilter: EnumTimesFilter.ALL,
      providers: "all",
    }),
    {
      name: "::sheira-time-and-provider-filter::",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)

export const dispatchFiltersServiceTime = (value: EnumTimesFilter) => useFiltersServices.setState((_) => ({ ..._, timesFilter: value }))
export const dispatchFiltersServiceProvider = (value: TServicesFilter) => useFiltersServices.setState((_) => ({ ..._, providers: value }))

export const useUrgentFilter = create(
  persist<IStateUrgentFilter>(
    () => ({
      urgent: null,
    }),
    {
      name: "::sheira-urgent-filter::",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)

export const dispatchUrgentFilter = (value: EnumHelper) =>
  useUrgentFilter.setState(
    (_) => ({
      urgent: _.urgent === value ? null : value,
    }),
    true,
  )

interface IFilterServices {
  timesFilter: EnumTimesFilter
  providers: TServicesFilter
}

interface IStateUrgentFilter {
  urgent: EnumHelper | null
}
