import type { Dispatch, FC, SetStateAction } from "react"
import type { ISegmentValues } from "@/components/common/Segments/types"
import type { IUserResponse } from "@/services/users/types"

export type TTypeSegment = "reviews" | "services"

interface IDots {
    id: number
}

interface IItemSegments {
    activeSegment: ISegmentValues<TTypeSegment>
    setActiveSegment: Dispatch<SetStateAction<ISegmentValues<TTypeSegment>>>
}

export type TInfoContainerProfile = FC<IUserResponse>
export type TDots = FC<IDots>
export type TItemsBadges = FC<IUserResponse>
export type TItemSegments = FC<IItemSegments>
export type TContent = FC<IUserResponse & { type: TTypeSegment }>
