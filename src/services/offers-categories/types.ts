import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn, TOrder } from "../types/general"
import { TCreateOfferCategory } from "@/components/templates/CreateNewCategory/utils/create.schema"
import { IResponse } from "../request/types"

export interface IResponseOffersCategories {
  id: number
  provider: EnumTypeProvider | "main" | "kursk"
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
  get(value?: { query: IQueryOffersCategories }): Promise<IResponse<IResponseOffersCategories[]>>
}

export type TPostOfferCategory = (values: { body: TCreateOfferCategory }) => IPromiseReturn<IResponseOffersCategories>
