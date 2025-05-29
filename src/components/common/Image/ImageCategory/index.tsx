import { IconSprite } from "@/components/icons/icon-sprite"
import { SpriteHeart } from "@/components/icons/icon-sprite-heart"
import { TSlugCategory } from "@/services/offers-categories/types"

interface IProps {
  slug: TSlugCategory | string
  provider: string
  isUrgent?: boolean
}

export function ImageCategory({ slug, provider, isUrgent }: IProps) {
  const string = ["main", "heart"].includes(provider!) ? (slug as TSlugCategory) : (provider as TSlugCategory) || "default"

  if ([provider, slug].includes("heart") || isUrgent) return <SpriteHeart />
  if (!provider && !slug) return <IconSprite id="icon-category-default" className="h-auto aspect-square" />

  return <IconSprite id={`icon-category-${string}`} className="h-auto aspect-square" />
}
