import type { FC } from "react"

interface IGeoTagging{
  size?: number
  location: string
  fontSize?: number
}

export type TGeoTagging = FC<IGeoTagging>