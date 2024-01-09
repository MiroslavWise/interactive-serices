import type { IReturnData } from "@/services/types/general"
import type { IResponseUploadFile } from "@/services/file-upload/types"

export interface IWrapperFetch {
    stringRequest: (value: string) => string
    methodGet<P>(url: string, query?: Record<string | number, any>): Promise<IReturnData<P>>
    methodGetId<P>(url: string, id: string | number, value?: Record<string, any>): Promise<IReturnData<P>>
    methodPost<T, P>(url: string, body?: T): Promise<IReturnData<P>>
    methodPatch<T, P>(url: string, body: T, id: string | number): Promise<IReturnData<P>>
    methodDelete<P>(url: string, id: string | number): Promise<IReturnData<P>>
    methodUploadFile(url: string, file: FormData): Promise<IReturnData<IResponseUploadFile>>
}
