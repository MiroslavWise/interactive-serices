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

export const getCompanies = () => fetchGet<ICompanyExtend[]>({ url })
export const getCompanyId = (id: number) => fetchGet<ICompanyExtend>({ url: `${url}/${id}` })

export interface IBodyCompany extends IBodyAdvertAction {
  title: string
  ad?: string
  erid: string
  inn: string
  ogrn?: string
  imageId?: number
}

export const postCompany = (body: IBodyCompany): IPromiseReturn<{ id: number }> => wrapperPost({ url, body })
export const patchCompany = (body: Partial<IBodyCompany>, id: number) => wrapperPatch({ url: `${url}/${id}`, body })
