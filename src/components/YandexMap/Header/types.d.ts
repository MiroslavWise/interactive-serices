import type { Dispatch, FC, SetStateAction } from "react"

interface IHeaderMobile {
    setVisibleNotification: Dispatch<SetStateAction<boolean>>
    setStateCoord: Dispatch<SetStateAction<number[]>>
    setZoom: Dispatch<SetStateAction<number>>
}

export type THeaderMobile = FC<IHeaderMobile>
