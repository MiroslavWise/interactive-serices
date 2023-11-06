import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"
import type { ISegmentValues } from "types/general"
import { IDataProfile } from "../../types"

interface IInfoContainerProfile {
    profile: IDataProfile
}

interface IItemsBadges {}

interface IItemSegments {
    values: ISegmentValues<string>[]
    activeSegment: ISegmentValues<string>
    setActiveSegment: Dispatch<SetStateAction<ISegmentValues<string>>>
}

interface IContainerReviews {}

interface IContainerBlogs {}

interface IDots {
    id: number | string
}

export type TInfoContainerProfile = FC<IInfoContainerProfile>
export type TItemsBadges = FC<IItemsBadges>
export type TItemSegments = FC<IItemSegments>
export type TContainerReviews = FC<IContainerReviews>
export type TContainerBlogs = FC<IContainerBlogs>
export type TDots = FC<IDots>
