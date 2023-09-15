import type { FC } from "react"

export interface IRequestsAndProposals{
  photos: string[]
  title: string
  services: {
    label: string
    photo: string
  }[]
  type?: "optional-2" | "optional-3"
} 

export type TRequestsAndProposals = FC<IRequestsAndProposals>