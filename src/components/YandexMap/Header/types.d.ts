import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"

interface IHeaderMobile {
    handleAddressLocation: DispatchWithoutAction
    setVisibleNotification: Dispatch<SetStateAction<boolean>>
}

export type THeaderMobile = FC<IHeaderMobile>
