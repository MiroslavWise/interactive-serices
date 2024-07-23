import type { IPromiseReturn } from "@/services/types/general"
import type { TTypeFriends } from "@/store/types/createDroverFriends"
import { IUserOffer } from "../offers/types"
import { IResponse } from "../request"

export interface IPostDataFriends {
  id: number
}

export type TPatchDataFriends = Partial<IPostDataFriends>

export interface IFriendsResponse extends IUserOffer {}

export interface IFriendResponseId {
  created: Date
  email: string
  id: number
}

interface IQueries {
  order?: "ASC" | "DESC"
  filter?: Exclude<TTypeFriends, "list">
}

export type TGetFriends = (values: { query?: IQueries }) => Promise<IResponse<IFriendsResponse[]>>
export type TGetFriendId = (id: string | number) => Promise<IResponse<IFriendsResponse[]>>
export interface IFriendsService {
  get(values?: IQueries): IPromiseReturn<IFriendsResponse[]>
  getId(id: number | string): IPromiseReturn<IFriendsResponse[]>
  post(value: IPostDataFriends): IPromiseReturn<IFriendsResponse>
  delete(id: number | string): IPromiseReturn<{ id: number }>
}
