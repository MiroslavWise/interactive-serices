import { ICompany } from "../types/company"
import { IUserOffer } from "../offers/types"
import { IBodyAdvertAction } from "../offers"
import { IPromiseReturn } from "../types/general"

import { fetchGet, wrapperDelete, wrapperPatch, wrapperPost } from "../request"

const url = "/companies"

export interface ICompanyExtend extends ICompany {
  owner: IUserOffer
  users?: IUserOffer[]
  enabled: boolean
}

export interface QCompanies {
  limit?: number
  page?: number
  search?: string
}

export const getCompanies = (values?: QCompanies) => fetchGet<ICompanyExtend[]>({ url, query: values })
export const getCompanyId = (id: number) => fetchGet<ICompanyExtend>({ url: `${url}/${id}` })

export interface IBodyCompany extends IBodyAdvertAction {
  title: string
  ad?: string
  erid?: string
  inn: string
  ogrn?: string
  imageId?: number
  userId?: number
  enabled?: boolean
}

export const postCompany = (body: IBodyCompany): IPromiseReturn<{ id: number }> => wrapperPost({ url, body })
export const patchCompany = (body: Partial<IBodyCompany>, id: number) => wrapperPatch({ url: `${url}/${id}`, body })

export const patchCompanyUsers = (users: number[], id: number) => wrapperPatch({ url: `${url}/${id}`, body: { users } })
export const deleteCompanyId = (id: number) => wrapperDelete({ url, id })
