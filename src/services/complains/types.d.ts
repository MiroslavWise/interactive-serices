import type { IPromiseReturn } from "../types/general"
import type { TTypeProvider } from "../file-upload/types"

export interface IPostComplains {
  receiverId: number
  message: string
  enabled: boolean
  provider: TTypeProvider //profile
}

export interface IResponseComplains {
  id: number
  message: string
  provider: TTypeProvider
  userId: number
  receiverId: number
  created: string
  updated: string
}

export interface IServiceComplains {
  post(values: IPostComplains): IPromiseReturn<{ id: number }>
}
