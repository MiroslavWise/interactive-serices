import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"

interface ISearchElementMap {
    handleAddressLocation: DispatchWithoutAction
}

export type TSearchElementMap = FC<ISearchElementMap>
