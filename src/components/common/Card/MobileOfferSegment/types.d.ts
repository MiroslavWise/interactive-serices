import type { FC, DispatchWithoutAction } from "react"

interface IMobileOfferSegment{
  src: string
  label: string

  handleClick: DispatchWithoutAction
}

export type TMobileOfferSegment = FC<IMobileOfferSegment>