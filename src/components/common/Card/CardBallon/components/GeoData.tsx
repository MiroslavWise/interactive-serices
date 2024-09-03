import Link from "next/link"
import { useMemo } from "react"

import { type IResponseOffers } from "@/services/offers/types"

import IconMapWhite from "@/components/icons/IconMapWhite"
import IconArrowRight from "@/components/icons/IconArrowRight"

import { dispatchMapCoordinates } from "@/store"

function GeoData({ offer }: { offer: IResponseOffers }) {
  const geo = useMemo(() => {
    if (!offer?.addresses?.length) return null

    const address = offer.addresses[0]

    const additional = address?.additional?.replace(`${address?.country}, `, "").replace(`${address?.region}, `, "") ?? ""

    return additional
  }, [offer?.addresses])

  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  return geo ? (
    <Link
      className="w-full cursor-pointer grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] items-start gap-2"
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
      <div className="relative w-6 h-6 p-3 rounded-xl bg-element-accent-1 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[0.9rem] *:h-[0.9rem]">
        <IconMapWhite />
      </div>
      <span className="text-text-secondary text-sm font-normal pt-0.5">{geo}</span>
      <div className="w-5 h-5 p-2.5  relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
        <IconArrowRight />
      </div>
    </Link>
  ) : null
}

GeoData.displayName = "GeoData"
export default GeoData
