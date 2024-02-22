import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn } from "../types/general"

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
  post(values: IPostComplains): IPromiseReturn<{ id: number }>
}
