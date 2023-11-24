import type { Dispatch } from "react"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { TTypeProvider } from "@/services/file-upload/types"

interface IStateHasBalloons {
    visibleHasBalloon: boolean
    data?: {
        address: IPostAddress
        ids: {
            id: number
            provider: TTypeProvider
        }[]
    }
}

interface IAction {
    visible: boolean
    address?: IPostAddress
    ids?: {
        id: number
        provider: TTypeProvider
    }[]
}

interface IActionHasBalloons {
    dispatchHasBalloon: Dispatch<IAction>
}

export type TUseHasBalloons = IStateHasBalloons & IActionHasBalloons
