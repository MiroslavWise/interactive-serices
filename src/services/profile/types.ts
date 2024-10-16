import { type IImageData } from "@/types/type"
import { type IResponse } from "../request/types"
import { type IPromiseReturn } from "@/services/types/general"
import { type TGenderForm } from "@/components/templates/UpdateProfile/utils/update-form.schema"

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

interface IProfileResponse {
  id: number
}

export interface IServiceProfile {
  get(): Promise<IResponse<IGetProfileIdResponse>>
  getUserId(id: number | string): Promise<IResponse<IGetProfileIdResponse>>
  post(value: IPostProfileData): Promise<IResponse<IProfileResponse>>
  patch(value: IPatchProfileData): Promise<IResponse<IGetProfileIdResponse>>
  delete(id: string | number): IPromiseReturn<IProfileResponse>
}
