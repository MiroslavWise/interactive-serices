"use client"

import { memo, useMemo } from "react"

import { IResponseOffers } from "@/services/offers/types"

import styles from "../styles/geo-data.module.scss"

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
    <footer className={styles.container}>
      <div data-geo>
        <img src="/svg/geo-marker.svg" alt="geo" width={16} height={16} />
      </div>
      <span>{geo}</span>
    </footer>
  ) : null
}

GeoData.displayName = "GeoData"
export default memo(GeoData)
