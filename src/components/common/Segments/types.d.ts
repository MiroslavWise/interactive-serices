import type { FC, ReactNode, Dispatch, SetStateAction } from "react"

interface ISegments {
  values: ISegmentValues[]
  active: ISegmentValues
  setActive: Dispatch<SetStateAction<ISegmentValues>>
  type: "primary" | "optional-1"
}

export type TSegments = FC<ISegments>

export interface ISegmentValues {
  value: string
  label: string
}