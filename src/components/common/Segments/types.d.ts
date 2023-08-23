import type { FC, ReactNode, Dispatch, SetStateAction, Ref } from "react"

interface ISegments {
  values: ISegmentValues[]
  active: ISegmentValues
  setActive: Dispatch<SetStateAction<ISegmentValues>>
  type: "primary" | "optional-1"
  classNames?: string
  ref?: Ref<HTMLDivElement>
  id?: string
}

export type TSegments = FC<ISegments>

export interface ISegmentValues {
  value: string
  label: string
}