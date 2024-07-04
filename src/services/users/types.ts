import type { IPromiseReturn } from "@/services/types/general"
import type { IGetProfileIdResponse } from "@/services/profile/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import type { IResponseDataRegistration } from "@/services/auth/types/registrationService"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"
import { IResponsePhones } from "../phones/types"
import { TRole } from "../roles/types"
import { EnumStatusBarter } from "@/types/enum"
import { IResponse } from "../request"

export interface IPostDataUser {
  email: string
  password: string
  repeat: string
  agree: boolean
  marketing: boolean
}

export interface IPatchDataUser extends Partial<IPostDataUser> {
  enabled?: boolean
  verified?: boolean
  auth_confirmation_token?: string
  categories?: number[]
}

export interface IUserResponse {
  id: number
  email: string
  enabled: boolean
  verified: boolean
  created: Date | string
  updated: Date | string
  deleted: any | null
  categories: IResponseOffersCategories[]
  phones: IResponsePhones[]
  profile: IGetProfileIdResponse
  addresses: IAddressesResponse[]
  roles: TRole[]
  barters: {
    id: number
    created: string
    status: EnumStatusBarter
  }[]
}

export interface IServiceUser {
  get(): Promise<IResponse<IUserResponse>>
  getId(id: string | number): Promise<IResponse<IUserResponse>>
  getEmail(value: string): Promise<IResponse<IUserResponse>>
  post(value: IPostDataUser, urlSearchParams?: string): IPromiseReturn<IResponseDataRegistration>
  patch(value: IPatchDataUser, id: number | string): IPromiseReturn<IUserResponse>
  delete(id: number | string): IPromiseReturn<IUserResponse>
}

export type TPatchEmailPasswordUser = (
  values: { email: string; password: string; repeat: string },
  id: number | string,
) => IPromiseReturn<IUserResponse>
