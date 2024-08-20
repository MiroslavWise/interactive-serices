import { type IResponse } from "../request"
import { EnumTypeProvider } from "@/types/enum"

export interface IPostComplains {
  receiverId: number
  message: string
  enabled: boolean
  provider: EnumTypeProvider //profile || offer
}

interface IResponseComplains {
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

interface IQuery {
  order: "ASC" | "DESC"
  page?: number //1
  limit?: number //1000
  receiver?: number
  user?: number
}

export type TGetComplains = (values: { query: IQuery }) => Promise<IResponse<IResponseComplains[]>>
