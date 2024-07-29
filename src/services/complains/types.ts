import { type IResponse } from "../request"
import { EnumTypeProvider } from "@/types/enum"

export interface IPostComplains {
  receiverId: number
  message: string
  enabled: boolean
  provider: EnumTypeProvider //profile
}

export interface IResponseComplains {
  id: number
  message: string
  provider: EnumTypeProvider
  userId: number
  receiverId: number
  created: string
  updated: string
}

export interface IServiceComplains {
  post(values: IPostComplains): Promise<IResponse<{ id: number }>>
}
