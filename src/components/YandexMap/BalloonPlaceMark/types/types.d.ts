import type {
    Dispatch,
    DispatchWithoutAction,
    FC,
    RefObject,
    SetStateAction,
} from "react"

import type { IActionBalloon, IStateBalloon } from "../../types"
import type { TTypeProvider } from "@/services/file-upload/types"

interface IBalloonPlaceMark {
    dispatch: Dispatch<IActionBalloon>
    stateBalloon: IStateBalloon
}

interface IBalloonComponent {
    stateBalloon: IStateBalloon
}

interface IOfferBalloonComponent extends IBalloonComponent {}
interface IDiscussionBalloonComponent extends IBalloonComponent {}
interface IAlertBalloonComponent extends IBalloonComponent {}
interface IRequestBalloonComponent extends IBalloonComponent {}

interface IButtonSuccessInBalloon {
    idUser: number
    onClick: DispatchWithoutAction
}

export type TBalloonPlaceMark = FC<IBalloonPlaceMark>
export type TOfferBalloonComponent = FC<IOfferBalloonComponent>
export type TDiscussionBalloonComponent = FC<IDiscussionBalloonComponent>
export type TAlertBalloonComponent = FC<IAlertBalloonComponent>
export type TRequestBalloonComponent = FC<IRequestBalloonComponent>
export type TButtonSuccessInBalloon = FC<IButtonSuccessInBalloon>
