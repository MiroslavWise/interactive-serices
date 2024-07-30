import { type IResponse } from "../request"

type TProviderLikes = "offer" | "user"

interface IPostDataLikes {
  id: number
  provider: TProviderLikes
}

interface IResponseLikes {
  created: Date
  id: number
  provider: TProviderLikes
  userId: number
}

export type TGetLikes = () => Promise<IResponse<IResponseLikes[]>>
export type TPostLike = (values: IPostDataLikes) => Promise<IResponse<number>>
export type TGetLikeTargetId = (provider: TProviderLikes, id: number) => Promise<IResponse<number>>
