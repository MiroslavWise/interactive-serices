"use client"

import { IconCategory } from "@/lib/icon-set"

interface IProps {
  id: number | string
  slug?: string
  provider?: string
}

export function ImageCategory({ id, slug, provider }: IProps) {
  if (!id) return null

  const src = slug === "heart" ? "/png/category/kursk.png" : provider === "heart" ? "/png/category/kursk.png" : IconCategory(id!)!

  return (
    <img
      alt={`${id!}::`}
      width={16}
      height={16}
      src={src}
      onError={(error: any) => {
        if (error?.target) {
          try {
            error.target.src = `/svg/category/default.svg`
          } catch (e) {
            console.log("catch e: ", e)
          }
        }
      }}
    />
  )
}
