import { IPromiseReturn } from "../../types/general"

interface IRequestPhone {
  phone: string
  orderBy?: number
  description?: string
}

export interface IResponsePhones {
  id: number
  userId: number
  phone: string
  description: string
}

interface IRequestVerifyPhone {
  phone: string
  code: string
}

export type TPostPhone = (values: IRequestPhone) => IPromiseReturn<IResponsePhones>
// export type TGetPhones = () => IPromiseReturn<IResponsePhones[]>
export type TPostVerifyPhone = (values: IRequestVerifyPhone) => IPromiseReturn<any>
