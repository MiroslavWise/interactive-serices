import { useMemo } from "react"

import { IResponseOffers } from "@/services/offers/types"
import IconMapWhite from "@/components/icons/IconMapWhite"
import Link from "next/link"
import { dispatchMapCoordinates } from "@/store"
import IconArrowRight from "@/components/icons/IconArrowRight"

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
      <div className="relative w-6 h-6 p-3 rounded-xl bg-element-accent-1 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-[0.9rem] [&>svg]:h-[0.9rem]">
        <IconMapWhite />
      </div>
      <span className="text-text-secondary text-sm font-normal pt-0.125">{geo}</span>
      <div className="w-5 h-5 p-0.625  relative [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5">
        <IconArrowRight />
      </div>
    </Link>
  ) : null
}

GeoData.displayName = "GeoData"
export default GeoData
