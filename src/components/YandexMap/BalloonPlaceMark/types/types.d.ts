import type {
    Dispatch,
    DispatchWithoutAction,
    FC,
    RefObject,
    SetStateAction,
} from "react"

import type { IActionBalloon, IStateBalloon } from "../../types"
import type { TTypeProvider } from "@/services/file-upload/types"
import type { ICommentsResponse } from "@/services/comments/types"

interface IBalloonPlaceMark {}

interface IBalloonComponent {}

interface IOfferBalloonComponent extends IBalloonComponent {}
interface IDiscussionBalloonComponent extends IBalloonComponent {}
interface IAlertBalloonComponent extends IBalloonComponent {}
interface IRequestBalloonComponent extends IBalloonComponent {}

interface IButtonSuccessInBalloon {
    onClick: DispatchWithoutAction
}

export interface IItemComment extends ICommentsResponse {
    isTemporary?: boolean
    isErrorRequest?: boolean
}
export interface IBlockComments {
    offerId: number
    type: "alert" | "discussion"
}

export interface IBlockLikes {
    id: number
}

interface IAvatarsBalloon {
    offerId: number
}

export type TAvatarsBalloon = FC<IAvatarsBalloon>
export type TBalloonPlaceMark = FC<IBalloonPlaceMark>
export type TOfferBalloonComponent = FC<IOfferBalloonComponent>
export type TDiscussionBalloonComponent = FC<IDiscussionBalloonComponent>
export type TAlertBalloonComponent = FC<IAlertBalloonComponent>
export type TRequestBalloonComponent = FC<IRequestBalloonComponent>
export type TButtonSuccessInBalloon = FC<IButtonSuccessInBalloon>

export type TItemComment = FC<IItemComment>
export type TBlockComments = FC<IBlockComments>
export type TBlockLikes = FC<IBlockLikes>
