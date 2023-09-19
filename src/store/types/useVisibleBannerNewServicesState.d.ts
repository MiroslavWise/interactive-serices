import { Dispatch } from "react"

export interface IUseVisibleBannerNewServicesState {
    isVisibleNewServicesBanner: boolean

    setIsVisibleNewServicesBanner: Dispatch<boolean>
}

export interface IUseVisibleNewServiceBarterRequests {
    isVisibleNewServiceBarterRequests: boolean

    setIsVisibleNewServiceBarterRequests: Dispatch<boolean>
}
