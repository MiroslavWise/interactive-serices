import { IPromiseReturn } from "../types/general"

export interface IRequestPhone {
  phone: string
  orderBy?: number
  description?: string
}

interface IResponse {
  id: number
  userId: number
  phone: string
  description: string
}

interface IRequestVerifyPhone {
  phone: string
  code: string
}

export type TPostPhone = (values: IRequestPhone) => IPromiseReturn<IResponse>
export type TGetPhones = () => IPromiseReturn<IResponse[]>
export type TPostVerifyPhone = (values: IRequestVerifyPhone) => IPromiseReturn<any>
