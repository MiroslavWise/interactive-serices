import type { IPromiseReturn } from "@/services/types/general"
import type { IGetProfileIdResponse } from "@/services/profile/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import type { IResponseDataRegistration } from "@/services/auth/types/registrationService"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"
// import type { IResponseLoginNot2fa } from "@/services/auth/types/authService"

export interface IPostDataUser {
  email: string
  password: string
  repeat: string
  agree: boolean
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
  // roles: IRolesResponse[]
  profile: IGetProfileIdResponse
  addresses: IAddressesResponse[]
}

export interface IServiceUser {
  get(): IPromiseReturn<IUserResponse>
  getId(id: string | number): IPromiseReturn<IUserResponse>
  getEmail(value: string): IPromiseReturn<IUserResponse>
  post(value: IPostDataUser): IPromiseReturn<IResponseDataRegistration>
  patch(value: IPatchDataUser, id: number | string): IPromiseReturn<IUserResponse>
  delete(id: number | string): IPromiseReturn<IUserResponse>
}
