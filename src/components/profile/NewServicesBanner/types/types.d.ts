import type { FC, Dispatch, SetStateAction } from "react"

interface INewServicesBanner{

}

export interface INewCreateBadge{
  imageSrc: string
  label: string
  value: string
}

export type TNewServicesBanner = FC<INewServicesBanner>
export type TNewCreateBadge = FC<INewCreateBadge>