import type { FC } from "react"
import type { Variants } from "framer-motion"

interface IImage{
  src: string
  alt: string
  width: number
  height: number
}

export type TImage = FC<IImage & Variants>