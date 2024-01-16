import type { DispatchWithoutAction, FC } from "react"

interface IGeoTagging {
    size?: number | string
    location: string
    fontSize?: number | string
    onClick?: DispatchWithoutAction
    className?: string
}

export type TGeoTagging = FC<IGeoTagging>
