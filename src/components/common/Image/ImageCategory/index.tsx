"use client"

interface IProps {
  id: number | string
  slug?: string
  provider?: string
  isUrgent?: boolean
}

export function ImageCategory({ id, slug, provider, isUrgent }: IProps) {
  if (!id) return null

  const src = slug === "heart" ? "/png/category/heart.png" : provider === "heart" ? "/png/category/heart.png" : `/svg/category/default.svg`

  return (
    <img
      alt={`${id!}::`}
      width={32}
      height={32}
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
