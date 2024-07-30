import { type IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { EnumTypeProvider } from "@/types/enum"

export interface IUseAddCreateModal {
  typeAdd?: EnumTypeProvider
  addressInit?: IPostAddress
}
