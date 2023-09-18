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

export interface IServiceUsers {
  private route: string
  public async get(value: Record<string, string | number>): Promise<IReturnData<IUserResponse[]>>
  public async getId(id: string | number): Promise<IReturnData<IUserResponse>>
  public async post(value: IPostDataUser): Promise<IReturnData<IResponseDataRegistration>>
  public async patch(value: IPatchDataUser, id: number | string): Promise<IReturnData<IUserResponse>>
  public async delete(id: number | string): Promise<IReturnData<IUserResponse>>
}