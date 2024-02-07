import type { IPromiseReturn, TProviderOffer } from "../types/general"

export interface IResponseOffersCategories {
  id: number
  provider: TProviderOffer
  title: string
  slug: string
  description: string | null
  content: string | null
}

export interface IServiceOffersCategories {
  get(value?: Record<string, string | number>): IPromiseReturn<IResponseOffersCategories[]>
}
