import ymaps from "yandex-maps"
import type { FC, MutableRefObject } from "react"
import { EnumTypeProvider } from "@/types/enum"

interface IYandexMap {}

export type TYandexMap = FC<IYandexMap>

export interface IStateBalloon {
  visible: boolean
  type: EnumTypeProvider | null
  id?: number | null
  idUser?: number | null
}

export type TTypeInstantsMap = ((value: ymaps.Map) => void) | MutableRefObject<ymaps.Map | undefined> | undefined

export interface IActionBalloon {
  visible: boolean
  type?: EnumTypeProvider
  id?: number
  idUser?: number
}
