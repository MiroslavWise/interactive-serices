import env from "@/config/environment"
import type { IResponseGeocode } from "./types/geocodeSearch"

export const geocodeSearch = async (
    value: string,
): Promise<IResponseGeocode> => {
    try {
        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${env.api_key_yandex}&format=json&geocode=${value}`,
        )
        const dataResponse = await response.json()
        console.log("dataResponse: ", dataResponse)
        return dataResponse
    } catch (e) {
        console.log("---ERROR GEOCODE--- ", e)
        return e as any
    }
}

export const geocodeSearchCoords = async (
    value: string,
): Promise<IResponseGeocode> => {
    try {
        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${env.api_key_yandex}&format=json&geocode=${value}&from=mapsapi`,
        )
        const dataResponse = await response.json()
        console.log("dataResponse: ", dataResponse)
        return dataResponse
    } catch (e) {
        console.log("---ERROR GEOCODE--- ", e)
        return e as any
    }
}
