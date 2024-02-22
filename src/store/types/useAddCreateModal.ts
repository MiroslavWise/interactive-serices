import { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { EnumTypeProvider } from "@/types/enum"
import type { Dispatch, DispatchWithoutAction } from "react"

export type TAddCreate = "offer" | "request" | "alert" | "discussion"

export interface IValuesVisibleType {
  type: EnumTypeProvider
  visible?: boolean
}

export interface IUseAddCreateModal {
  typeAdd?: EnumTypeProvider
  isVisible: boolean
  addressInit?: IPostAddress

  dispatchVisibleTypeCreateOptionals: Dispatch<IValuesVisibleType | void>
}
