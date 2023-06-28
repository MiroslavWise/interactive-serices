import type { FC, Dispatch, SetStateAction } from "react"
import type { IStateVisible, IDataProfile } from "../types"

interface IProfilePublic {
  active: boolean
  profile: IDataProfile | null
  setActive: Dispatch<SetStateAction<IStateVisible>>
}

export type TProfilePublic = FC<IProfilePublic>