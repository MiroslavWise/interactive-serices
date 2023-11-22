import type { Dispatch, DispatchWithoutAction } from "react"

interface IStateFilterMap {
    idTarget: null | string
}

interface IActionFilterMap {
    dispatchTarget: Dispatch<number>
}

export type TUseFilterMap = IStateFilterMap & IActionFilterMap
