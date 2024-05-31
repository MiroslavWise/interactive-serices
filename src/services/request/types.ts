import type { IResponseUploadFile } from "@/services/file-upload/types"
import type { IResponseGeneral, IReturnData } from "@/services/types/general"
import { type AxiosProgressEvent } from "axios"
import { Dispatch } from "react"

export type IPromiseReturn<P> = Promise<IReturnData<P>>
export type TReturnData<P> = (values: IResponseGeneral<P>) => IReturnData<P>
export type TReturnError = (values: unknown) => IReturnData<any>

export type MethodGet<P extends Record<string, any>> = (values: {
  url: string
  query?: Record<string | number, any>
  cache?: RequestCache
}) => IPromiseReturn<P>

export type MethodGetId<P extends Record<string, any>> = (values: {
  url: string
  id: string | number
  query?: Record<string, any>
  cache?: RequestCache
}) => IPromiseReturn<P>

export type MethodPost<T extends Record<string, any>, P extends Record<string, any>> = (values: {
  url: string
  body?: T | string
  cache?: RequestCache
}) => IPromiseReturn<P>

export type MethodPatch<T extends Record<string, any>, P extends Record<string, any>> = (values: {
  url: string
  body: T
  id?: string | number
  cache?: RequestCache
}) => IPromiseReturn<P>

export type MethodDelete = (values: { url: string; id: string | number }) => IPromiseReturn<any>

export type MethodUploadFile = (values: {
  url: string
  file: FormData
  onUploadProgress?: (value: AxiosProgressEvent, name: FormDataEntryValue | null) => void
}) => IPromiseReturn<IResponseUploadFile>

export interface IWrapperFetch {
  stringRequest: (value: string) => string
}
