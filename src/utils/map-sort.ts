/**
 * @description Сортировка по координатам на карте
 */

import { LngLatBounds } from "ymaps3"
import { distancePureForMapSort } from "./distance"

interface IProps<T = any> {
  bounds: number[][] | LngLatBounds
  items: T[]
}

const OFFSET = 0.02

export function mapSort<T = any>({ bounds, items }: IProps<T>) {
  const minCoords = bounds[0]
  const maxCoors = bounds[1]

  const centerOne = (minCoords[0] + maxCoors[0]) / 2
  const centerTwo = (minCoords[1] + maxCoors[1]) / 2

  const center = [centerOne, centerTwo]
  const startB = [center.map((_) => _ - OFFSET), center.map((_) => _ + OFFSET)]

  let obj: Record<number | string, T[]> = {}

  recursion({ bounds: startB, items: items, number: 0 })

  function recursion({ bounds: b, items, number }: IProps & { number: number }) {
    const residue: T[] = []

    for (const item of items) {
      const coordinates = item?.addresses?.[0]?.coordinates?.split(" ")?.map(Number)?.filter(Boolean) ?? [0, 0]

      const minNewCoords = b[0]
      const maxNewCoors = b[1]

      const bool = distancePureForMapSort({ bounds, mapPoint: coordinates })

      if (bool) {
        if (
          Array.isArray(coordinates) &&
          coordinates[0] < maxNewCoors[0] &&
          coordinates[0] > minNewCoords[0] &&
          coordinates[1] < maxNewCoors[1] &&
          coordinates[1] > minNewCoords[1]
        ) {
          if (!!obj[number]) {
            obj[number].push(item)
          } else {
            obj[number] = [item]
          }
        } else {
          residue.push(item)
        }
      }
    }

    if (residue.length > 0) {
      const newStart = [
        [b[0][0] - OFFSET, b[0][1] - OFFSET],
        [b[1][0] + OFFSET, b[1][1] + OFFSET],
      ]

      recursion({ bounds: newStart, items: residue, number: number + 1 })
    }
  }

  return Object.values(obj).flat()
}

function hash(array: number[]) {
  let hash = 0
  const str = JSON.stringify(array)
  for (const item of str) {
    const char = item.charCodeAt(0)
    hash = (hash * 31 + char) % 2 ** 32
  }

  return hash.toString(16)
}

export const JSONStringBounds = (bounds?: number[][] | LngLatBounds) => (bounds ? hash((bounds as number[][])?.flat()) : undefined)
