/**
 * @description Расчет расстояния между двумя точками на карте
 */

import { LngLatBounds } from "ymaps3"

import { RADIAN } from "./utils-data-map"

interface IProps {
  bounds: number[][] | LngLatBounds
  mapPoint: number[]
}

const DISTANCE = 150
const R = 6371
const toRadians = (degrees: number) => degrees * RADIAN
const a = (Δφ: number, φ1: number, φ2: number, Δλ: number) => Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
const c = (a: number) => 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

export const dis = ({ bounds, mapPoint }: IProps): number | null => {
  if (!Array.isArray(mapPoint)) return null

  const minCoords = bounds[0]
  const maxCoors = bounds[1]
  const lonCenter = (minCoords[0] + maxCoors[0]) / 2
  const latCenter = (minCoords[1] + maxCoors[1]) / 2

  const lonMap = mapPoint[0]
  const latMap = mapPoint[1]

  const φ1 = toRadians(latCenter)
  const φ2 = toRadians(latMap)

  const Δφ = toRadians(latMap - latCenter)
  const Δλ = toRadians(lonMap - lonCenter)

  return R * c(a(Δφ, φ1, φ2, Δλ))
}

export function distance({ bounds, mapPoint }: IProps) {
  const d = dis({ bounds, mapPoint })

  if (typeof d !== "number") return null

  if (d < 1) {
    const nd = (d * 1000).toFixed(0)
    return `${nd}м`
  } else {
    return `${d.toFixed(1)}км`
  }
}

export function distancePure({ bounds, mapPoint }: IProps): boolean {
  /*
    * @description Расчет расстояния между двумя точками на карте
    * @param bounds - границы области
    * @param mapPoint - координаты точки на карте
    * 
    const d = dis({ bounds, mapPoint })

  if (typeof d !== "number") return false */

  return true
}

const deviation = 0.02

/** Попадает ли точка в область */
export function distancePureForMapSort({ bounds, mapPoint = [0, 0] }: IProps): boolean {
  const topLeft = bounds[0]
  const bottomRight = bounds[1]

  const point = mapPoint

  const [pointLat, pointLon] = point // Широта и долгота точки
  const [minLat, maxLon] = topLeft // Минимальная широта и максимальная долгота
  const [maxLat, minLon] = bottomRight // Максимальная широта и минимальная долгота

  const expandedMinLat = minLat - deviation
  const expandedMaxLat = maxLat + deviation
  const expandedMinLon = minLon - deviation
  const expandedMaxLon = maxLon + deviation

  // Проверяем, находится ли точка в пределах расширенных границ
  const isLatInBounds = pointLat >= expandedMinLat && pointLat <= expandedMaxLat
  const isLonInBounds = pointLon >= expandedMinLon && pointLon <= expandedMaxLon

  return isLatInBounds && isLonInBounds
}
