import type { FC, ReactNode, Dispatch, SetStateAction, Ref } from "react"

interface ISegments {
    VALUES: ISegmentValues<any>[]
    active: ISegmentValues<any>
    setActive: Dispatch<
        SetStateAction<ISegmentValues<any>> & ISegmentValues<any>
    >
    type: "primary" | "optional-1"
    classNames?: string
    ref?: Ref<HTMLUListElement>
    id?: string
}

export type TSegments = FC<ISegments>

export interface ISegmentValues<T> {
    value: T
    label: string
}
