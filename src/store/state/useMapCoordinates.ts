import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IDispatchMapCoordinates, IUseMapCoordinates } from "../types/createMapCoordinates"

export const useMapCoordinates = create(
  persist<IUseMapCoordinates>(
    (set, get) => ({
      coordinates: undefined,
      zoom: 16,
      dispatchMapCoordinates({ coordinates, zoom }) {
        const getCoordinates = typeof coordinates === "undefined" ? get().coordinates : coordinates
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

export const dispatchMapCoordinates = ({ coordinates, zoom }: IDispatchMapCoordinates) =>
  useMapCoordinates.setState((_) => {
    const getCoordinates = typeof coordinates === "undefined" ? _.coordinates : coordinates
    const getZoom = typeof zoom === "undefined" ? _.zoom : zoom

    return {
      coordinates: getCoordinates,
      zoom: getZoom,
    }
  })
