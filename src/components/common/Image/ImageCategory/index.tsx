"use client"

import { IconSpriteCategoryId } from "@/components/icons/icon-sprite-category"

interface IProps {
  id: number | string | "default" | "heart"
  slug?: string
  provider?: string
  isUrgent?: boolean
}

export function ImageCategory({ id, slug, provider, isUrgent }: IProps) {
  if (!id) return null

  const i = isUrgent || slug === "heart" || provider === "heart" ? "heart" : "default"

  return <IconSpriteCategoryId id={`category-${i}`} />
}
