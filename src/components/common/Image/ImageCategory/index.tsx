"use client"

import { IconCategory } from "@/lib/icon-set"

interface IProps {
  id: number | string
  slug?: string
  provider?: string
  isUrgent?: boolean
}

export function ImageCategory({ id, slug, provider, isUrgent }: IProps) {
  if (!id) return null

  const src = slug === "heart" ? "/png/category/heart.png" : provider === "heart" ? "/png/category/heart.png" : IconCategory(id!)!

  return (
    <img
      alt={`${id!}::`}
      width={16}
      height={16}
      src={src}
      onError={(error: any) => {
        if (error?.target) {
          try {
            if (isUrgent) {
              error.target.src = `/png/category/heart.png`
            } else {
              error.target.src = `/svg/category/default.svg`
            }
          } catch (e) {
            console.log("catch e: ", e)
          }
        }
      }}
    />
  )
}
