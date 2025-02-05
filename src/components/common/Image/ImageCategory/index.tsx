"use client"

import { IconSpriteCategoryId } from "@/components/icons/icon-sprite-category"
import { ICON_SET_OFFERS, ICON_SET_STRING } from "@/lib/icon-set"

interface IProps {
  id: number | string | "default" | "heart"
  slug?: string
  provider?: string
  isUrgent?: boolean
}

export function ImageCategory({ id, slug, provider, isUrgent }: IProps) {
  if (!id) return null

  const i =
    isUrgent || slug === "heart" || provider === "heart"
      ? "heart"
      : typeof id === "string" && ICON_SET_STRING.includes(id)
      ? id
      : ICON_SET_OFFERS.includes(id as number)
      ? id
      : "default"

  return <IconSpriteCategoryId id={`category-${i}`} />

  // return (
  //   <img
  //     alt={`${id!}::`}
  //     width={32}
  //     height={32}
  //     src={src}
  //     onError={(error: any) => {
  //       if (error?.target) {
  //         try {
  //           if (isUrgent) {
  //             error.target.src = `/png/category/heart.png`
  //           } else {
  //             error.target.src = `/svg/category/default.svg`
  //           }
  //         } catch (e) {
  //           console.log("catch e: ", e)
  //         }
  //       }
  //     }}
  //   />
  // )
}
