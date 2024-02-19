import { EnumTypeProvider } from "@/types/enum"
import type { IPromiseReturn } from "../types/general"

export interface IResponseOffersCategories {
  id: number
  provider: EnumTypeProvider | "main"
  title: string
  slug: string
  description: string | null
  content: string | null
}

export interface IServiceOffersCategories {
  get(value?: Record<string, string | number>): IPromiseReturn<IResponseOffersCategories[]>
}
