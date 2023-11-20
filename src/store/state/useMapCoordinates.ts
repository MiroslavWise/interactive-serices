import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseMapCoordinates } from "../types/createMapCoordinates"

export const useMapCoordinates = create(
    persist<IUseMapCoordinates>(
        (set, get) => ({
            coordinates: undefined,
            zoom: 16,
            dispatchMapCoordinates({ coordinates, zoom }) {
                const getCoordinates =
                    typeof coordinates === "undefined"
                        ? get().coordinates
                        : coordinates
                const getZoom = typeof zoom === "undefined" ? get().zoom : zoom

                set({
                    coordinates: getCoordinates,
                    zoom: getZoom,
                })
            },
        }),
        {
            name: "coordinates",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
