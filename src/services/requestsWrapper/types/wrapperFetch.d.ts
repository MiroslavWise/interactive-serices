export interface IWrapperFetch {
  methodGet<P>(url: string, query: { [key: string]: string }): Promise<IServiceResponse<P>>
  methodGetId<P>(url: string, id: string | number): Promise<IServiceResponse<P>>
  methodPost<T, P>(url: string, body: T): Promise<IServiceResponse<P>>
  methodPatch<T, P>(url: string, body: T, id: string): Promise<IServiceResponse<P>>
  methodDelete<P>(url: string, id: string | number): Promise<IServiceResponse<P>>
}

export interface IServiceResponse<T>{
  ok: boolean
  res?: T
  error?: any
  code?: number
}