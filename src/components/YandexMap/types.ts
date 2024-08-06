import ymaps from "yandex-maps"
import type { FC, MutableRefObject } from "react"

interface IYandexMap {}
export type TYandexMap = FC<IYandexMap>
export type TTypeInstantsMap = ((value: ymaps.Map) => void) | MutableRefObject<ymaps.Map | undefined> | undefined
