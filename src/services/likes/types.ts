import type { IPromiseReturn } from "../types/general"

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

export interface ILikesService {
  post(value: IPostDataLikes): IPromiseReturn<number>
  get(): IPromiseReturn<IResponseLikes[]>
  getTargetId(provider: TProviderLikes, id: number): IPromiseReturn<number>
}
