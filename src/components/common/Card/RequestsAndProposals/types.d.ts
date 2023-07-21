import type { FC } from "react"

export interface IRequestsAndProposals{
  photos: string[]
  title: string
  services: {
    label: string
    photo: string
  }[]
} 

export type TRequestsAndProposals = FC<IRequestsAndProposals>