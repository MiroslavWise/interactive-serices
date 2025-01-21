import { ICompany } from "../types/company"

import { fetchGet, wrapperPatch } from "../request"

const url = "/companies"

export const getCompanyId = (id: number) => fetchGet<ICompany>({ url: `${url}/${id}` })

export interface IBodyCompany {
  title?: string
  ad?: string
  erid?: string
  inn?: string
  ogrn?: string
  imageId?: number
}

export const patchCompany = (body: IBodyCompany, id: number) => wrapperPatch({ url: `${url}/${id}`, body })
