import type { IImageData } from "@/store/types/useAuthState"
import type { IPromiseReturn } from "@/services/types/general"

export interface IPostProfileData {
  username?: string
  firstName?: string
  lastName?: string
  birthdate?: string
  about?: string
  enabled?: boolean
  userId?: string | number //post
  imageId?: number | null
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
  created: Date
  updated: Date
  image: IImageData
}

export interface IProfileResponse {
  id: number
}

export interface IServiceProfile {
  get(value: { [key: string]: string | number }): IPromiseReturn<IGetProfileIdResponse>
  getUserId(id: number | string): IPromiseReturn<IGetProfileIdResponse>
  post(value: IPostProfileData): IPromiseReturn<IProfileResponse>
  patch(value: IPatchProfileData, id: string | number): IPromiseReturn<IGetProfileIdResponse>
  delete(id: string | number): IPromiseReturn<IProfileResponse>
}
