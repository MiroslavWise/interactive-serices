import type { IReturnData } from "@/services/types/general"
import type { IImageData } from "@/store/types/useAuthState"

export interface IPostProfileData {
  username?: string
  firstName?: string
  lastName?: string
  birthdate?: string
  about?: string
  enabled?: boolean
  userId?: string | number //post
  imageId?: number
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
  route: string
  get(value: { [key: string]: string | number }): Promise<IReturnData<IGetProfileIdResponse[]>>
  getMe(): Promise<IReturnData<IGetProfileIdResponse>>
  getId(id: string | number): Promise<IReturnData<IGetProfileIdResponse>>
  getUserId(id: number | string): Promise<IReturnData<IGetProfileIdResponse>>
  post(value: IPostProfileData): Promise<IReturnData<IProfileResponse>>
  patch(value: IPatchProfileData, id: string | number): Promise<IReturnData<IPatchProfileResponse>>
  delete(id: string | number): Promise<IReturnData<IProfileResponse>>
}