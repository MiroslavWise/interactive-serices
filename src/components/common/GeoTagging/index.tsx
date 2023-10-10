import Image from "next/image"

import type { TGeoTagging } from "./types"

import styles from "./style.module.scss"

export const GeoTagging: TGeoTagging = ({
    size,
    location,
    fontSize,
    onClick,
}) => {
    function handle(event: any) {
        event.preventDefault()
        event.stopPropagation()
        if (onClick) {
            onClick()
        }
    }
    return (
        <div className={styles.geo} onClick={handle}>
            <Image
                src="/svg/geo-marker.svg"
                alt="geo"
                width={size || 20}
                height={size || 20}
            />
            <p style={{ fontSize: fontSize || 16 }}>{location}</p>
        </div>
    )
}
