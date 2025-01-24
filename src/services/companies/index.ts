import { ICompany } from "../types/company"
import { IUserOffer } from "../offers/types"

import { IPromiseReturn } from "../types/general"
import { fetchGet, wrapperPatch, wrapperPost } from "../request"
import { IBodyAdvertAction } from "../offers"

const url = "/companies"

export interface ICompanyExtend extends ICompany {
  owner: IUserOffer
  users?: IUserOffer[]
}

interface Q {
  limit?: number
  page?: number
}

export const getCompanies = (values?: Q) => fetchGet<ICompanyExtend[]>({ url, query: values })
export const getCompanyId = (id: number) => fetchGet<ICompanyExtend>({ url: `${url}/${id}` })

export interface IBodyCompany extends IBodyAdvertAction {
  title: string
  ad?: string
  erid?: string
  inn: string
  ogrn?: string
  imageId?: number
  userId?: number
}

export const postCompany = (body: IBodyCompany): IPromiseReturn<{ id: number }> => wrapperPost({ url, body })
export const patchCompany = (body: Partial<IBodyCompany>, id: number) => wrapperPatch({ url: `${url}/${id}`, body })

export const patchCompanyUsers = (users: number[], id: number) => wrapperPatch({ url: `${url}/${id}`, body: { users } })
