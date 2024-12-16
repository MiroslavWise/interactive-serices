interface IProps {
  bounds: number[][]
  mapPoint: number[]
}

const R = 6371
const toRadians = (degrees: number) => degrees * (Math.PI / 180)
const a = (Δφ: number, φ1: number, φ2: number, Δλ: number) => Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
const c = (a: number) => 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

// долгота - lon
// широта - lat

export function distance({ bounds, mapPoint }: IProps) {
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

  const d = R * c(a(Δφ, φ1, φ2, Δλ))

  if (d < 1) {
    const nd = (d * 1000).toFixed(0)
    return `${nd}м`
  } else {
    return `${d.toFixed(1)}км`
  }
}
