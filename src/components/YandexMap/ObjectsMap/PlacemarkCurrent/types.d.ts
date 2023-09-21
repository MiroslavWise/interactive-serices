import { IProvider, TTypeProvider } from "@/services/file-upload/types"
import type { FC } from "react"

export interface IPlacemarkCurrent {
    title: string
    provider: TTypeProvider
    coordinates: [number, number][]
    id: string | number
    idUser: number | string
}

export type TPlacemarkCurrent = FC<IPlacemarkCurrent>
