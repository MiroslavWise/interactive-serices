import Image from "next/image"

import type { TGeoTagging } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

export const GeoTagging: TGeoTagging = ({
    size,
    location,
    fontSize,
    onClick,
    className,
}) => {
    function handle(event: any) {
        if (onClick) {
            onClick()
        }
    }
    return (
        <div className={cx(styles.geo, className)} onClick={handle} data-geo>
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
