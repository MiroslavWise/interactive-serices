import { type IResponseUploadFile } from "@/services/file-upload/types"
import { type IReturnData } from "@/services/types/general"
import { type AxiosProgressEvent } from "axios"
import { type IResponse } from "."

type IPromiseReturn<P> = Promise<IReturnData<P>>
export type TReturnError = (values: unknown) => IReturnData<any>

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
}) => Promise<IResponse<IResponseUploadFile>>
