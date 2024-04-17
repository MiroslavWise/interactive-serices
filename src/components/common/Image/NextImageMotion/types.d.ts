import { DispatchWithoutAction } from "react"

export interface IProps {
  src: string
  alt: "avatar" | "offer-image" | string | "offer"
  hash?: string
}
