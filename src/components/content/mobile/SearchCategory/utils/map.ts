import { distance } from "@/utils/distance"

interface IProps<T = any> {
  bounds: number[][]
  items: T[]
}

export function mapSort<T = any>({ bounds, items }: IProps<T>) {
  const minCoords = bounds[0]
  const maxCoors = bounds[1]

  const centerOne = (minCoords[0] + maxCoors[0]) / 2
  const centerTwo = (minCoords[1] + maxCoors[1]) / 2

  const center = [centerOne, centerTwo]
  const startB = [center.map((_) => _ - 1), center.map((_) => _ + 1)]

  let obj: Record<number | string, T[]> = {}

  recursion({ bounds: startB, items: items, number: 0 })!

  function recursion({ bounds: b, items: offers, number }: IProps & { number: number }) {
    const residue: T[] = []

    for (const item of offers) {
      const coordinates = item?.addresses[0]?.coordinates?.split(" ").map(Number).filter(Boolean)

      const minNewCoords = b[0]
      const maxNewCoors = b[1]

      if (
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

    if (residue.length > 0 && Object.values(obj).length < 100) {
      const newStart = [
        [b[0][0] - 1, b[0][1] - 1],
        [b[1][0] + 1, b[1][1] + 1],
      ]

      recursion({ bounds: newStart, items: residue, number: number + 1 })
    }
  }

  return Object.values(obj).flat()
}
