import { ICompany } from "../types/company"

import { IUserOffer } from "../offers/types"
import { fetchGet, wrapperPatch } from "../request"

const url = "/companies"

export interface ICompanyExtend extends ICompany {
  owner: IUserOffer
  users?: IUserOffer[]
}

export const getCompanyId = (id: number) => fetchGet<ICompanyExtend>({ url: `${url}/${id}` })

export interface IBodyCompany {
  title?: string
  ad?: string
  erid?: string
  inn?: string
  ogrn?: string
  imageId?: number
}

export const patchCompany = (body: IBodyCompany, id: number) => wrapperPatch({ url: `${url}/${id}`, body })
