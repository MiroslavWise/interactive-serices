import type { Dispatch, FC, SetStateAction } from "react"

interface ISearchElementMap {
    setStateCoord: Dispatch<SetStateAction<number[]>>
    setZoom: Dispatch<SetStateAction<number>>
}

export type TSearchElementMap = FC<ISearchElementMap>
