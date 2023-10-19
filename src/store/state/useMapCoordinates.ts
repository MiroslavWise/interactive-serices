import { create } from "zustand"

import type { IUseMapCoordinates } from "../types/createMapCoordinates"

export const useMapCoordinates = create<IUseMapCoordinates>((set, get) => ({
    coordinates: undefined,
    zoom: 16,
    dispatchMapCoordinates({ coordinates, zoom }) {
        console.log("coordinates: ", coordinates)
        const getCoordinates =
            typeof coordinates === "undefined" ? get().coordinates : coordinates
        const getZoom = typeof zoom === "undefined" ? get().zoom : zoom

        set({
            coordinates: getCoordinates,
            zoom: getZoom,
        })
    },
}))
