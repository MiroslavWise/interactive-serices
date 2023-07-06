import type { IReturnData } from "@/services/types/general"

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
  private route: string
  public async getProfiles(value: { [key: string]: string }): Promise<IReturnData<IGetProfilesResponse>>
  public async getProfileId(id: string | number): Promise<IReturnData<IGetProfileIdResponse>>
  public async getProfileThroughUserId(id: number | string): Promise<IReturnData<IGetProfileIdResponse>>
  public async postProfile(value: IPostProfileData): Promise<IReturnData<IProfileResponse>>
  public async patchProfile(value: IPostProfileData, id: string): Promise<IReturnData<IPatchProfileResponse>>
  public async deleteProfile(id: string | number): Promise<IReturnData<IProfileResponse>>
}