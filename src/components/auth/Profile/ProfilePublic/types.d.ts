import type { FC, Dispatch, SetStateAction } from "react"
import type { IStateVisible, IDataProfile } from "../types"

interface IProfilePublic {
  active: IStateVisible
  setActive: Dispatch<SetStateAction<IStateVisible>>
}

export type TProfilePublic = FC<IProfilePublic>