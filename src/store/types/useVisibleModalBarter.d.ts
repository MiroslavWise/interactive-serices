import type { Dispatch } from "react"


interface IDataProfile{

}

export interface IUseVisibleModalBarter{
  isVisible: boolean
  dataProfile: IDataProfile | undefined

  setIsVisibleBarter: Dispatch<{isVisible: boolean, dataProfile?: IDataProfile}>
}