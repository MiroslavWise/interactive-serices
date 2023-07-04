import type { IServiceResponse } from "@/services/requestsWrapper/types/wrapperFetch"
import type { IWrapperFetch } from "@/services/requestsWrapper/types/wrapperFetch"

export interface IPostProfileData {
  username: string
  firstName: string
  lastName: string
  birthdate: string
  about: string
  enabled?: boolean
  userId?: string | number
}

export interface IGetProfilesResponse{
  limit: number
  offset: number
  totalCount: number
  list: IGetProfileIdResponse[]
}
export interface IGetProfileIdResponse{
  id: number
  user_id: number
  username: string
  first_name: string
  last_name: string
  birthdate: Date
  about: string
  enabled: boolean
  created: Date
  updated: Date
}

export interface IProfileResponse {
  id: number
}

export interface TProfileService {
  async getProfiles(value: { [key: string]: string }): Promise<IServiceResponse<IGetProfilesResponse>>
  async getProfileId(id: string | number): Promise<IServiceResponse<IGetProfileIdResponse>>
  async postProfile(value: IPostProfileData): Promise<IServiceResponse<IProfileResponse>>
  async patchProfile(value: IPostProfileData, id: string): Promise<IServiceResponse<IPatchProfileResponse>>
  async deleteProfile(id: string | number): Promise<IServiceResponse<IProfileResponse>>
}