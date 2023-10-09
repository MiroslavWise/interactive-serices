import { create } from "zustand"

import type { IUseMapCoordinates } from "../types/createMapCoordinates"

export const useMapCoordinates = create<IUseMapCoordinates>((set, get) => ({
    coordinates: [55.75, 37.67],
    zoom: 16,
    dispatchMapCoordinates({ coordinates, zoom }) {
        const getCoordinates =
            typeof coordinates === "undefined" ? get().coordinates : coordinates
        const getZoom = typeof zoom === "undefined" ? get().zoom : zoom

        set({
            coordinates: getCoordinates,
            zoom: getZoom,
        })
    },
}))
