import Link from "next/link"
import { useMemo } from "react"

import { type IResponseOffers } from "@/services/offers/types"

import { IconGeo } from "@/components/icons/IconGeo"

import { dispatchMapCoordinates, useBounds } from "@/store"
import { distance } from "@/utils/distance"

function GeoData({ offer }: { offer: IResponseOffers }) {
  const bounds = useBounds(({ bounds }) => bounds)

  const geo = useMemo(() => {
    if (!offer?.addresses?.length) return ["", ""]

    const address = offer.addresses[0]

    const additional = address?.additional?.replace(`${address?.country}, `, "").replace(`${address?.region}, `, "") ?? ""

    let d = ""

    if (bounds && Array.isArray(bounds)) {
      const coordinates = address?.coordinates?.split(" ").map(Number).filter(Boolean)

      d = distance({ bounds: bounds, mapPoint: coordinates })
    }

    return [additional, d]
  }, [offer?.addresses, bounds])

  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  return (
    <Link
      className="w-full cursor-pointer flex flex-row items-start gap-2 justify-between"
      onClick={() => {
        if (geoData) {
          dispatchMapCoordinates({
            zoom: 17,
            coordinates: geoData?.coordinates?.split(" ")?.map(Number),
          })
        }
      }}
      href={{ pathname: "/" }}
      title="Перейти к точке на карте"
      aria-label="Перейти к точке на карте"
      aria-labelledby="Перейти к точке на карте"
    >
      <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2">
        <div className="relative w-4 h-4 p-2 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
          <IconGeo />
        </div>
        <span className="text-text-secondary leading-4 text-[0.8125rem] font-normal">{geo[0]}</span>
      </div>
      <span className="whitespace-nowrap text-[0.8125rem] leading-4 text-text-secondary font-normal text-right">{geo[1]}</span>
    </Link>
  )
}

GeoData.displayName = "GeoData"
export default GeoData
