import type { IResponseUploadFile } from "@/services/file-upload/types"
import type { IMetaData, IResponseGeneral, IReturnData } from "@/services/types/general"

export type IPromiseReturn<P> = Promise<IReturnData<P>>
export type TReturnData = (values: IResponseGeneral) => IReturnData<P>
export type TReturnError = (values: unknown) => IReturnData<unknown>

export interface IWrapperFetch {
  stringRequest: (value: string) => string

  MethodGet<P extends any>(values: { url: string; query?: Record<string | number, any>; cache?: RequestInit["cache"] }): IPromiseReturn<P>
  MethodGetId<P extends any>(values: {
    url: string
    id: string | number
    query?: Record<string, any>
    cache?: RequestInit["cache"]
  }): IPromiseReturn<P>
  MethodPost<T, P>(values: { url: string; body?: T | string; cache?: RequestInit["cache"] }): IPromiseReturn<P>
  MethodPatch<T, P>(values: { url: string; body: T; id: string | number; cache?: RequestInit["cache"] }): IPromiseReturn<P>
  MethodDelete(values: { url: string; id: string | number }): IPromiseReturn<any>
  MethodUploadFile(values: { url: string; file: FormData }): IPromiseReturn<IResponseUploadFile>
}
