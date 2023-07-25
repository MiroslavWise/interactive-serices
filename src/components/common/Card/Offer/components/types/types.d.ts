import type { FC } from "react"

interface IBlockBarter{

}

interface IBlockTitle{
  photo: string
  name: string
  geo: string
  price?: number
  rating: number
}

export type TBlockBarter = FC<IBlockBarter>
export type TBlockTitle = FC<IBlockTitle>