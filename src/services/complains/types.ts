import { IResponse } from "../request/types"
import { EnumTypeProvider } from "@/types/enum"
import { IPaginateQuery } from "../types/general"

export interface IPostComplains {
  receiverId: number
  message: string
  enabled: boolean
  provider: EnumTypeProvider //profile || offer
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

interface IQuery extends IPaginateQuery {
  receiver?: number
  user?: number
}

export type TGetComplains = (values: { query: IQuery }) => Promise<IResponse<IResponseComplains[]>>
