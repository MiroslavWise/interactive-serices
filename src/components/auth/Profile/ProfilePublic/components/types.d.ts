import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"
import type { ISegmentValues } from "types/general"
import { IDataProfile } from "../../types"

interface IInfoContainerProfile{
        profile: IDataProfile
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

interface IContainerBlogs{

}

export type TInfoContainerProfile = FC<IInfoContainerProfile>
export type TItemsBadges = FC<IItemsBadges>
export type TItemSegments = FC<IItemSegments>
export type TContainerReviews = FC<IContainerReviews>
export type TContainerBlogs = FC<IContainerBlogs>