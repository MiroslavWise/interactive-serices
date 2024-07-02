import type { IImageData } from "@/store/types/useAuthState"
import type { IPromiseReturn } from "@/services/types/general"
import { TGenderForm } from "@/components/templates/UpdateProfile/utils/update-form.schema"

export interface IPostProfileData {
  username?: string
  firstName?: string
  lastName?: string
  birthdate?: string
  about?: string
  enabled?: boolean
  userId?: string | number //post
  imageId?: number | null
  gender?: TGenderForm
}

export type IPatchProfileData = Partial<IPostProfileData>

export interface IGetProfileIdResponse {
  id: number
  userId: number
  username: string
  firstName: string
  lastName: string
  birthdate: Date
  about: string
  enabled: boolean
  gender?: TGenderForm | null
  created: Date
  updated: Date
  image: IImageData
}

export interface IProfileResponse {
  id: number
}

export interface IServiceProfile {
  get(): IPromiseReturn<IGetProfileIdResponse>
  getUserId(id: number | string): IPromiseReturn<IGetProfileIdResponse>
  post(value: IPostProfileData): IPromiseReturn<IProfileResponse>
  patch(value: IPatchProfileData): IPromiseReturn<IGetProfileIdResponse>
  delete(id: string | number): IPromiseReturn<IProfileResponse>
}
