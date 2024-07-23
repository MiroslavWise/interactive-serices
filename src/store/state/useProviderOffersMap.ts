import { create } from "zustand"

import type { TServicesFilter } from "@/components/content/BannerServices/types/types"

export const useProviderOffersMap = create<IStateProviderOffersMap>((set, get) => ({
  type: "all",
}))

export const dispatchProviderOffersMap = (value: TServicesFilter) =>
  useProviderOffersMap.setState((_) => ({
    type: value,
  }))

interface IStateProviderOffersMap {
  type: TServicesFilter
}
