import type { Dispatch } from "react"
import { EnumStatusBarter } from "@/types/enum"

export interface IUseVisibleExchanges {
  isVisible: boolean
  type?: EnumStatusBarter

  dispatchExchanges: Dispatch<{ visible?: boolean; type?: any }>
}
