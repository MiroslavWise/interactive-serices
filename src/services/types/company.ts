import { EAdvertsButton } from "@/types/enum"
import { IImageData } from "@/types/type"

export type TTypeActionCompany = {
  action: EAdvertsButton
  url: string
}

export interface ICompany {
  id: number
  title?: string
  ad?: string
  erid?: string
  inn?: string
  ogrn?: string
  actions?: TTypeActionCompany[]
  image?: IImageData
}
