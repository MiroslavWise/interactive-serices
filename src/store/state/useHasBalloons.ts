import { create } from "zustand"

import type { TUseHasBalloons, IAction } from "../types/createHasBalloons"

export const useHasBalloons = create<TUseHasBalloons>((set, get) => ({
    visibleHasBalloon: false,
}))

export const dispatchHasBalloon = (values: IAction) =>
    useHasBalloons.setState((_) => ({
        ...values,
    }))
