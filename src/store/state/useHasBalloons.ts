import { create } from "zustand"

import type { TUseHasBalloons } from "../types/createHasBalloons"

export const useHasBalloons = create<TUseHasBalloons>((set, get) => ({
    visibleHasBalloon: false,

    dispatchHasBalloon({ visible, address, ids }) {
        if (visible && address && ids && ids?.length > 0) {
            set({
                visibleHasBalloon: visible,
                data: {
                    address: address,
                    ids: ids,
                },
            })
        } else {
            set({
                visibleHasBalloon: visible,
                data: undefined,
            })
        }
    },
}))
