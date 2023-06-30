import type { Dispatch, FC, SetStateAction } from "react"

interface IHeaderMobile {
  setVisibleNotification: Dispatch<SetStateAction<boolean>>
}

export type THeaderMobile = FC<IHeaderMobile>