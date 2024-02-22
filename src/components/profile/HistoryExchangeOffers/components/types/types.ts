import type { FC, Dispatch, SetStateAction } from "react"
import { EnumStatusBarter } from "@/types/enum"
import type { ISegmentValues } from "@/components/common/Segments/types"

interface IHeader {
  value: ISegmentValues<EnumStatusBarter>
  setValue: Dispatch<SetStateAction<ISegmentValues<EnumStatusBarter>>>
}

interface ISentenceCards {
  value: ISegmentValues<EnumStatusBarter>
}

export type THeader = FC<IHeader>
export type TSentenceCards = FC<ISentenceCards>
