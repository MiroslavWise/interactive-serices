import { create } from "zustand"
import { TUseUpdateMutualOffer } from "../types/createUpdateMutualOffer"

export const useUpdateMutualOffer = create<TUseUpdateMutualOffer>(
    (set, get) => ({
        visibleUpdateMutual: false,

        dispatchUpdateMutual({ visible, data }) {
            set({
                visibleUpdateMutual: visible,
                data: data,
            })
        },
    }),
)
