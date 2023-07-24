import type { IReturnData } from "@/services/types/general"
import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"
import type { IRolesResponse } from "@/services/roles/types/serviceRoles"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import type { IResponseDataRegistration } from "@/services/auth/types/registrationService"

export interface IPostDataUser {
  email: string
  password: string
  repeat: string
}

export interface IPatchDataUser extends IPostDataUser {
  enabled?: boolean
  verified?: boolean
  auth_confirmation_token?: string
}

export interface IUserResponse {
  id: number
  email: string
  enabled: boolean
  verified: boolean
  created: Date
  updated: Date
  deleted: any | null
  roles: IRolesResponse[]
  profile: IGetProfileIdResponse
  addresses: IAddressesResponse[]
}

export interface IResponseUsers {
  private route: string
  public async getUsers(value: { [key: string]: string | number }): Promise<IReturnData<IUserResponse[]>>
  public async getUserId(id: string | number): Promise<IReturnData<IUserResponse>>
  public async postUser(value: IPostDataUser): Promise<IReturnData<IResponseDataRegistration>>
  public async patchUser(value: IPatchDataUser, id: number | string): Promise<IReturnData<IUserResponse>>
  public async deleteUser(id: number | string): Promise<IReturnData<IUserResponse>>
}