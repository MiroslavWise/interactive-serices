import type { FC, ReactNode, Dispatch, SetStateAction, Ref } from "react"

interface ISegments {
    values: ISegmentValues<string>[]
    active: ISegmentValues<string>
    setActive: Dispatch<SetStateAction<ISegmentValues<any>>>
    type: "primary" | "optional-1"
    classNames?: string
    ref?: Ref<HTMLDivElement>
    id?: string
}

export type TSegments = FC<ISegments>

export interface ISegmentValues<T> {
    value: T
    label: string
}
