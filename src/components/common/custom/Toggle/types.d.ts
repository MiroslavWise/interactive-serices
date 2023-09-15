import type { Dispatch, FC, SetStateAction } from "react"

interface ICustomToggle{
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}

export type TCustomToggle = FC<ICustomToggle>