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

interface IBalloonComponent {
    stateBalloon: IStateBalloon
}

interface IOfferBalloonComponent extends IBalloonComponent {}
interface IDiscussionBalloonComponent extends IBalloonComponent {}
interface IAlertBalloonComponent extends IBalloonComponent {}
interface IRequestBalloonComponent extends IBalloonComponent {}

interface IButtonSuccessInBalloon {
    onClick: DispatchWithoutAction
}

export interface IItemComment extends ICommentsResponse {}
export interface IBlockComments {
    offerId: number
    type: "alert" | "discussion"
}

export type TBalloonPlaceMark = FC<IBalloonPlaceMark>
export type TOfferBalloonComponent = FC<IOfferBalloonComponent>
export type TDiscussionBalloonComponent = FC<IDiscussionBalloonComponent>
export type TAlertBalloonComponent = FC<IAlertBalloonComponent>
export type TRequestBalloonComponent = FC<IRequestBalloonComponent>
export type TButtonSuccessInBalloon = FC<IButtonSuccessInBalloon>

export type TItemComment = FC<IItemComment>
export type TBlockComments = FC<IBlockComments>
