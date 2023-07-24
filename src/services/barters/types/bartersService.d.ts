import type { IReturnData } from "@/services/types/general"

export interface IBarterResponse{

}

export interface IPostDataBarter{

}

export interface IPatchDataBarter extends IPostDataBarter{

}



export interface IBartersService{
  private route: string
  public async getBarters(value: { [key: string]: string }): Promise<IReturnData<IBarterResponse[]>>
  public async getBarterId(id: string | number): Promise<IReturnData<IBarterResponse>>
  public async postBarter(value: IPostDataBarter): Promise<IReturnData<IBarterResponse>>
  public async patchBarter(value: IPatchDataBarter, id: number | string): Promise<IReturnData<IBarterResponse>>
  public async deleteBarter(id: number | string): Promise<IReturnData<IBarterResponse>>
}