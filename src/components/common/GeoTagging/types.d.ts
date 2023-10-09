import type { DispatchWithoutAction, FC } from "react"

interface IGeoTagging {
    size?: number
    location: string
    fontSize?: number
    onClick?: DispatchWithoutAction
}

export type TGeoTagging = FC<IGeoTagging>
