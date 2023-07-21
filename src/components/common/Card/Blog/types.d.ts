import type { FC } from "react"

export interface ICardBlog{
  photo: string
  title: string
  services: { label: string, photo: string }[]
}

export type TCardBlog = FC<ICardBlog>