import type { IResponseLoginNot2fa } from "./authService"
import type { IPromiseReturn } from "@/services/types/general"
import { IAgree } from "./typeAgree"

export interface IRequestPhone extends Partial<IAgree> {
  phone: string
  params?: string
}

export type TStatusOk = "ok"

export interface IResponsePhone {
  phone: string
  status: TStatusOk
  id: number
}

export interface IResponseTelegram {
  id: number
  first_name: string
  last_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

export interface IAuth {
  sms({ code, id }: { code: string; id: number | string }): IPromiseReturn<IResponseLoginNot2fa>
  phone(value: IRequestPhone): IPromiseReturn<IResponsePhone>
  postGoogle(values: Record<string, any>): IPromiseReturn<IResponseLoginNot2fa>
  postTelegram(values: Record<string, any>): IPromiseReturn<IResponseLoginNot2fa>
  postYandex(values: Record<string, any>): IPromiseReturn<IResponseLoginNot2fa>
  postVK(values: Record<string, any>): IPromiseReturn<IResponseLoginNot2fa>
}

interface INewPassword {
  oldPassword: string
  password: string
  repeat: string
}

export type TPostNewPassword = (values: INewPassword) => IPromiseReturn<any>
export type TGetSession = () => IPromiseReturn<any>
export type TGetLogout = () => IPromiseReturn<any>
