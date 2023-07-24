import Image from "next/image"

import type { TGeoTagging } from "./types"

import styles from "./style.module.scss"

export const GeoTagging: TGeoTagging = ({ size,  location, fontSize  }) => {

  return (
    <div className={styles.geo}>
      <Image
        src="/svg/geo-marker.svg"
        alt="geo"
        width={size || 20}
        height={size || 20}
      />
      <p style={{fontSize: fontSize || 16}}>{location}</p>
    </div>
  )
}