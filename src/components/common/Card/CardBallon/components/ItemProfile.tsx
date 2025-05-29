"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { IUserOffer } from "@/services/offers/types"

import Avatar from "@avatar"
import IconRating from "@/components/icons/IconRating"

import { getTestimonials } from "@/services"
import { EnumTypeProvider } from "@/types/enum"

function ItemProfile({ user, provider, targetId }: { user: IUserOffer; provider: EnumTypeProvider; targetId: number }) {
  const { firstName, lastName, image } = user ?? {}

  const { data: dataTestimonials } = useQuery({
    queryFn: () => getTestimonials({ target: targetId!, provider: provider, order: "DESC" }),
    queryKey: ["testimonials", provider, targetId],
    enabled: !!targetId,
  })

  const rating = useMemo(() => {
    if (!dataTestimonials?.data || dataTestimonials?.data?.length === 0) return null

    let sum = 0
    let count = 0

    for (const item of dataTestimonials?.data) {
      sum += item.rating
      count = count + 1
    }

    return Number(sum / count)
  }, [dataTestimonials?.data])

  const name = `${firstName ?? "Имя"} ${lastName ?? ""}`

  return (
    <section className="mt-1 w-full pt-2.5 border-t border-t-grey-stroke-light border-solid">
      <div className="flex flex-row items-center justify-between w-full gap-2.5">
        <article className="flex flex-row items-center gap-2.5">
          <Avatar className="h-6 w-6 rounded-md" image={image} />
          <p className="text-text-primary text-sm font-normal line-clamp-1 whitespace-nowrap">{name}</p>
        </article>
        {rating ? (
          <div className="flex flex-row items-center">
            <div className="relative w-4 h-4 p-[0.1875rem] flex items-center justify-center *:w-2.5 *:h-2.5">
              <IconRating />
            </div>
            <span className="text-text-accent text-xs font-medium">{rating?.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}

ItemProfile.displayName = "ItemProfile"
export default ItemProfile
