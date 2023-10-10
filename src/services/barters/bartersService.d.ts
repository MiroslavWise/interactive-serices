import type { TTypeProvider } from "@/services/file-upload/types"
import type { IReturnData } from "@/services/types/general"

export interface IBarterResponse{
  id: number
  parentId: number
  offerId: number
  provider: string
  title: string
  imageId: number | null
  userId: number | null
}

export interface IPostDataBarter{
  parentId?: number
  categoryId?: number
  addresses?: number[]
  subscribers?: number[]
  provider: TTypeProvider
  title: string
  imageId?: number
  userId?: number
  orderBy?: number
  createdById?: number
  updatedById?: number
  enabled: boolean //true
}

export type IPatchDataBarter = Partial<IPostDataBarter>



export interface IBartersService{
  private route: string
  public async get(value: { [key: string]: string }): Promise<IReturnData<IBarterResponse[]>>
  public async getId(id: string | number): Promise<IReturnData<IBarterResponse>>
  public async getUserId(id: string | number): Promise<IReturnData<IBarterResponse>>
  public async post(value: IPostDataBarter): Promise<IReturnData<IBarterResponse>>
  public async patch(value: IPatchDataBarter, id: number | string): Promise<IReturnData<IBarterResponse>>
  public async delete(id: number | string): Promise<IReturnData<IBarterResponse>>
}