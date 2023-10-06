import { TTypeProvider } from "@/services/file-upload/types"
import { Dispatch } from "react"

export interface IActionBalloonCard {
    visible?: boolean
    type?: TTypeProvider | null
    id?: number
    idUser?: number
}

export interface IUseBalloonCard {
    visible: boolean
    type: TTypeProvider | undefined
    id: number | undefined
    idUser: number | undefined

    dispatch: Dispatch<IActionBalloonCard>
}
