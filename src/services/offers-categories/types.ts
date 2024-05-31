import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn, TOrder } from "../types/general"
import { TCreateOfferCategory } from "@/components/templates/CreateNewCategory/utils/create.schema"

export interface IResponseOffersCategories {
  id: number
  provider: EnumTypeProvider | "main"
  title: string
  slug: string
  description: string | null
  content: string | null
}

export interface IQueryOffersCategories {
  order?: TOrder
  page?: number
  limit?: number
}

export interface IServiceOffersCategories {
  get(value?: { query: IQueryOffersCategories }): IPromiseReturn<IResponseOffersCategories[]>
}

export type TPostOfferCategory = (values: { body: TCreateOfferCategory }) => IPromiseReturn<IResponseOffersCategories>
