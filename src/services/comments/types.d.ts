import type { IPromiseReturn } from "@/services/types/general"

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
  created?: Date
  updated?: Date
}

export interface IPostDataComment {
  parentId?: number | null
  offerThreadId?: number
  barterThreadId?: number
  message: string
  status: string
  enabled: boolean
}

export type IPatchDataComment = Partial<IPostDataComment>

interface IQueries {
  user?: number
  status?: TTypeStatusComments
  barter?: number
  offer?: number
  target?: number
}

export interface ICommentsService {
  get(values?: IQueries): IPromiseReturn<ICommentsResponse[]>
  getId(id: string | number): IPromiseReturn<ICommentsResponse>
  post(value: IPostDataComment): IPromiseReturn<ICommentsResponse>
  patch(value: IPatchDataComment, id: number | string): IPromiseReturn<ICommentsResponse>
}
