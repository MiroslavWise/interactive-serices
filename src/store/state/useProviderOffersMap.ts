import { create } from "zustand"

import type { TServices } from "@/components/content/BannerServices/types/types"

export const useProviderOffersMap = create<IStateProviderOffersMap>((set, get) => ({
    type: "all",
}))

export const dispatchProviderOffersMap = (value: TServices) =>
    useProviderOffersMap.setState((_) => ({
        type: value,
    }))

interface IStateProviderOffersMap {
    type: TServices
}
