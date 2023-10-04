import type { IActionBalloon } from "../../types"
import type { Dispatch, FC, SetStateAction } from "react"
import type { IProvider, TTypeProvider } from "@/services/file-upload/types"

export interface IPlacemarkCurrent {
    title: string
    provider: TTypeProvider
    coordinates: [number, number][]
    id: string | number
    idUser: number | string
    dispatch: Dispatch<IActionBalloon>
}

export type TPlacemarkCurrent = FC<IPlacemarkCurrent>
