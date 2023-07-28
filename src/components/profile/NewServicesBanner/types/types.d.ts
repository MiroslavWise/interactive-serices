import type { FC, Dispatch, SetStateAction } from "react"

interface INewServicesBanner{
  active: boolean

  setActive: Dispatch<SetStateAction<boolean>>
}

export type TNewServicesBanner = FC<INewServicesBanner>