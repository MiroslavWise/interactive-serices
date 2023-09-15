import type { FC, Dispatch, SetStateAction } from "react"
import type { ISegmentValues } from "@/components/common/Segments/types"

interface IHeader{
  value: ISegmentValues
  setValue: Dispatch<SetStateAction<ISegmentValues>>
}

interface ISentenceCards{
  value: ISegmentValues
}

export type THeader = FC<IHeader>
export type TSentenceCards = FC<ISentenceCards>