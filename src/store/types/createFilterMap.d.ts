import type { Dispatch, DispatchWithoutAction } from "react"

interface IStateFilterMap {
    idTarget: null | number
}

interface IActionFilterMap {
    dispatchTarget: Dispatch<number>
}

export type TUseFilterMap = IStateFilterMap & IActionFilterMap
