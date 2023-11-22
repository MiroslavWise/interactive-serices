import { create } from "zustand"
import type { TUseFilterMap } from "../types/createFilterMap"

export const useFilterMap = create<TUseFilterMap>((set, get) => ({
    idTarget: null,

    dispatchTarget(value) {
        if (value?.toString() === get().idTarget) {
            set({ idTarget: null })
        } else {
            set({ idTarget: value?.toString() })
        }
    },
}))
