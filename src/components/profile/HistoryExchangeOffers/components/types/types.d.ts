import type { FC, Dispatch, SetStateAction } from "react"
import type { TTypeStatusBarter } from "@/services/file-upload/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

interface IHeader {
    value: ISegmentValues<TTypeStatusBarter>
    setValue: Dispatch<SetStateAction<ISegmentValues<TTypeStatusBarter>>>
}

interface ISentenceCards {
    value: ISegmentValues<TTypeStatusBarter>
}

export type THeader = FC<IHeader>
export type TSentenceCards = FC<ISentenceCards>
