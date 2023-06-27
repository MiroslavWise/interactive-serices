import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"
import type { ISegmentValues } from "types/general"

interface IInfoContainerProfile{

}

interface IItemsBadges{

}

interface IItemSegments{
        values: ISegmentValues[]
        activeSegment: ISegmentValues
        setActiveSegment: Dispatch<SetStateAction<ISegmentValues>>
}

interface IContainerReviews{

}

export type TInfoContainerProfile = FC<IInfoContainerProfile>
export type TItemsBadges = FC<IItemsBadges>
export type TItemSegments = FC<IItemSegments>
export type TContainerReviews = FC<IContainerReviews>