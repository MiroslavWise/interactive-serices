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
  private route: string
  public async get(value: { [key: string]: string | number }): Promise<IReturnData<IGetProfileIdResponse[]>>
  public async getId(id: string | number): Promise<IReturnData<IGetProfileIdResponse>>
  public async getUserId(id: number | string): Promise<IReturnData<IGetProfileIdResponse>>
  public async post(value: IPostProfileData): Promise<IReturnData<IProfileResponse>>
  public async patch(value: IPatchProfileData, id: string | number): Promise<IReturnData<IPatchProfileResponse>>
  public async delete(id: string | number): Promise<IReturnData<IProfileResponse>>
}