import { type IUserOffer } from "../offers/types"
import { type IPromiseReturn } from "@/services/types/general"
import { IResponse } from "../request/types"

export type TTypeStatusComments = "published" | "create"

export interface ICommentsResponse {
  id: number
  parentId: number | null
  userId: number
  offerThreadId?: number
  barterThreadId?: number
  message: string
  status: TTypeStatusComments
  enabled: boolean
  created?: string
  updated?: Date
  user: IUserOffer
}

export interface IPostDataComment {
  parentId?: number | null
  offerThreadId?: number
  barterThreadId?: number
  message: string
  status: string
  enabled: boolean
}

type IPatchDataComment = Partial<IPostDataComment>

interface IQueries {
  user?: number
  status?: TTypeStatusComments
  barter?: number
  offer?: number
  target?: number
  limit?: number
}

export interface ICommentsService {
  get(values?: IQueries): Promise<IResponse<ICommentsResponse[]>>
  getId(id: string | number): IPromiseReturn<ICommentsResponse>
  post(value: IPostDataComment): IPromiseReturn<ICommentsResponse>
  patch(value: IPatchDataComment, id: number | string): IPromiseReturn<ICommentsResponse>
}
