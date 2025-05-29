import type { IPromiseReturn, TOrder } from "../types/general"
import { TCreateOfferCategory } from "@/components/templates/CreateNewCategory/utils/create.schema"
import { IResponse } from "../request/types"

export type TSlugCategory =
  | "heart"
  | "beauty"
  | "housework"
  | "social"
  | "appliances"
  | "studying"
  | "transport"
  | "foto-video-audio"
  | "needlework"
  | "cooking"
  | "design"
  | "business"
  | "pets"
  | "games"
  | "rent"
  | "psychology"
  | "recommendation"

export interface IResponseOffersCategories {
  id: number
  provider: TSlugCategory | "main" | "kursk"
  title: string
  slug: TSlugCategory | string
  description: string | null
  content: string | null
}

export interface IQueryOffersCategories {
  order?: TOrder
  page?: number
  limit?: number
  provider?: "main"
}

export interface IServiceOffersCategories {
  get(value?: { query: IQueryOffersCategories }): Promise<IResponse<IResponseOffersCategories[]>>
}

export type TPostOfferCategory = (values: { body: TCreateOfferCategory }) => IPromiseReturn<IResponseOffersCategories>
