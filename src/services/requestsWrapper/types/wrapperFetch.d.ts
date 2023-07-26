import type { IReturnData } from "@/services/types/general"
import type { IResponseUploadFile } from "@/services/file-upload/types"

export interface IWrapperFetch {
  methodGet<P>(url: string, query: { [key: string]: string | number }): Promise<IReturnData<P>>
  methodGetId<P>(url: string, id: string | number): Promise<IReturnData<P>>
  methodPost<T, P>(url: string, body: T): Promise<IReturnData<P>>
  methodPatch<T, P>(url: string, body: T, id: string | number): Promise<IReturnData<P>>
  methodDelete<P>(url: string, id: string | number): Promise<IReturnData<P>>
  methodUploadFile(url: string, file: FormData): Promise<IReturnData<IResponseUploadFile>>
}