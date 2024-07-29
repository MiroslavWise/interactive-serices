import { type IResponse } from "../request"

export type TProviderLikes = "offer" | "user"

export interface IPostDataLikes {
  id: number
  provider: TProviderLikes
}

export interface IResponseLikes {
  created: Date
  id: number
  provider: TProviderLikes
  userId: number
}

export type TGetLikes = () => Promise<IResponse<IResponseLikes[]>>
export type TPostLike = (values: IPostDataLikes) => Promise<IResponse<number>>
export type TGetLikeTargetId = (provider: TProviderLikes, id: number) => Promise<IResponse<number>>
