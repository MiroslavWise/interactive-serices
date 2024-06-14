import { useMemo } from "react"

import { IResponseOffers } from "@/services/offers/types"

function GeoData({ offer }: { offer: IResponseOffers }) {
  const geo = useMemo(() => {
    if (!offer?.addresses?.length) return null

    const address = offer.addresses[0]

    const city = address?.city
    const street = address?.street
    const house = address?.house

    const filter = [city, street, house].filter(Boolean).join(", ")

    if (filter.length === 0) {
      return address.additional
    }

    return filter
  }, [offer?.addresses])

  return geo ? (
    <footer className="w-full flex flex-row items-start gap-1">
      <div className=" relative w-4 h-4 p-2">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4"
          src="/svg/geo-marker.svg"
          alt="geo"
          width={16}
          height={16}
        />
      </div>
      <span className=" text-text-secondary text-[0.8125rem] leading-4 font-normal">{geo}</span>
    </footer>
  ) : null
}

GeoData.displayName = "GeoData"
export default GeoData
