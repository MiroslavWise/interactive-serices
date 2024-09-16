import { clg } from "@console"
import { type IResponseGeocode } from "./types/geocodeSearch"

import env from "@/config/environment"

export const getGeocodeSearch = async (value = ""): Promise<IResponseGeocode> => {
  clg("env.api_key_yandex: ", env.api_key_yandex, "error")

  try {
    const trim = value.trim()
    return (
      await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${env.api_key_yandex}&format=json&geocode=${trim}`, {
        cache: "force-cache",
      })
    ).json()
  } catch (e) {
    clg("ERROR GEOCODE", e, "error")
    return e as any
  }
}

export const getGeocodeSearchCoords = async (value: string): Promise<IResponseGeocode> => {
  try {
    return (
      await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${env.api_key_yandex}&format=json&geocode=${value}&from=mapsapi`, {
        cache: "force-cache",
      })
    ).json()
  } catch (e) {
    clg("ERROR GEOCODE COORDS", e, "error")
    return e as any
  }
}
