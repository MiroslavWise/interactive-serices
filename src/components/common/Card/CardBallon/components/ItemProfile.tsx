"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { IUserOffer } from "@/services/offers/types"

import IconRating from "@/components/icons/IconRating"
import { NextImageMotion } from "@/components/common/Image"

import { getTestimonials } from "@/services"
import { dispatchProfilePublic } from "@/store"
import Link from "next/link"

function ItemProfile({ user }: { user: IUserOffer }) {
  const { id, firstName, lastName, image } = user ?? {}

  const { data: dataTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: id! }),
    queryKey: ["testimonials", { receiver: id }],
    enabled: !!id,
  })

  const rating = useMemo(() => {
    if (!dataTestimonials?.res || dataTestimonials?.res?.length === 0) return null

    let sum = 0
    let count = 0

    for (const item of dataTestimonials?.res) {
      sum += item.rating
      count = count + 1
    }

    return Number(sum / count)
  }, [dataTestimonials])

  const name = `${firstName || " "} ${lastName || " "}`

  function handleProfile() {
    dispatchProfilePublic({ visible: true, idUser: id })
  }

  return (
    <section className="mt-1 w-full pt-0.625 border-t-[1px] border-t-grey-stroke-light border-solid">
      <div className="flex flex-row items-center justify-between w-full gap-0.625">
        <Link
          className="flex flex-row items-center gap-0.625"
          onClick={(event) => {
            event.stopPropagation()
            // handleProfile()
          }}
          href={{ pathname: `/customer/${id}` }}
        >
          <div className="relative h-6 w-6 rounded-md bg-BG-second overflow-hidden [&>img]:absolute [&>img]:inset-0 [&>img]:h-full [&>img]:w-full">
            <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={24} height={24} />
          </div>
          <p className="text-text-primary text-sm font-normal line-clamp-1 whitespace-nowrap">{name}</p>
        </Link>
        {rating ? (
          <div className="flex flex-row items-center">
            <div className="w-4 h-4 p-[0.1875rem] flex items-center justify-center [&>svg]:w-0.625 [&>svg]:h-0.625">
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
