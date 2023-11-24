import { Dispatch } from "react"

export interface IUseVisibleBannerNewServicesState {
    isVisibleNewServicesBanner: boolean

    dispatchNewServicesBanner: Dispatch<boolean>
}

export interface IUseVisibleNewServiceBarterRequests {
    isVisibleNewServiceBarterRequests: boolean

    dispatchNewServiceBarterRequests: Dispatch<boolean>
}
