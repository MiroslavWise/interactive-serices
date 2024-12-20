import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { type IDispatchMapCoordinates, type IUseMapCoordinates } from "../types/createMapCoordinates"

const COORD = [37.427698, 55.725864]

export const useMapCoordinates = create(
  persist<IUseMapCoordinates>(
    () => ({
      coordinates: COORD,
      zoom: 13,
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
  }, true)

export const dispatchMapCoordinatesZoom = (zoom: number) =>
  useMapCoordinates.setState(
    (_) => ({
      zoom: zoom,
      coordinates: _.coordinates,
    }),
    true,
  )
