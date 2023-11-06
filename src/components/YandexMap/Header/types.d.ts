import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"

interface IHeaderMobile {
    handleAddressLocation: DispatchWithoutAction
}

export type THeaderMobile = FC<IHeaderMobile>
