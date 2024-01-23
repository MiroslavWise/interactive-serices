import type { IMetaData, IReturnData } from "@/services/types/general"
import type { IResponseUploadFile } from "@/services/file-upload/types"

interface IResponseGeneral<P> {
    data: P | P[]
    error: any | null
    meta: IMetaData
}

export interface IWrapperFetch {
    returnData(response: IResponseGeneral): IReturnData<P>
    returnError(response: unknown): IReturnData<unknown>

    stringRequest: (value: string) => string
    methodGet<P>(url: string, query?: Record<string | number, any>): Promise<IReturnData<P>>
    methodGetId<P extends any>(url: string, id: string | number, value?: Record<string, any>): Promise<IReturnData<P>>
    methodPost<T, P>(url: string, body?: T | string): Promise<IReturnData<P>>
    methodPatch<T, P>(url: string, body: T, id: string | number): Promise<IReturnData<P>>
    methodDelete<P>(url: string, id: string | number): Promise<IReturnData<P>>
    methodUploadFile(url: string, file: FormData): Promise<IReturnData<IResponseUploadFile>>
}
