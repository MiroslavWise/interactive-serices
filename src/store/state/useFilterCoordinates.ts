import { create } from "zustand"

import type { TUseFilterCoordinates } from "../types/createFilterCoordinates"

export const useFilterCoordinates = create<TUseFilterCoordinates>(
    (set, get) => ({}),
)
