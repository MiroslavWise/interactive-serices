import { IconSprite } from "@/components/icons/icon-sprite"
import { TSlugCategory } from "@/services/offers-categories/types"

interface IProps {
  slug: TSlugCategory | string
  provider: string
  isUrgent?: boolean
}

export function ImageCategory({ slug, provider }: IProps) {
  const string = ["main", "heart"].includes(provider!) ? (slug as TSlugCategory) : (provider as TSlugCategory) || "default"

  return <IconSprite id={`icon-category-${string}`} className="h-auto aspect-square" />
}
