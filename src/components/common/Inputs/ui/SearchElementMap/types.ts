import type { DispatchWithoutAction, FC } from "react"

interface ISearchElementMap {
  handleAddressLocation: DispatchWithoutAction
}

export type TSearchElementMap = FC<ISearchElementMap>
