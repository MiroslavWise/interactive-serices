import ymaps from "yandex-maps"
import type { FC, MutableRefObject } from "react"

interface IYandexMap {}

export type TYandexMap = FC<IYandexMap>

export interface IStateBalloon {
    visible: boolean
    type: TTypeProvider | null
    id?: number | null
    idUser?: number | null
}

export type TTypeInstantsMap =
    | ((value: ymaps.Map) => void)
    | MutableRefObject<ymaps.Map | undefined>
    | undefined

export interface IActionBalloon {
    visible: boolean
    type?: TTypeProvider
    id?: number
    idUser?: number
}
