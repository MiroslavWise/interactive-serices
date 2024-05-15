"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { IUserOffer } from "@/services/offers/types"

import IconRating from "@/components/icons/IconRating"
import { NextImageMotion } from "@/components/common/Image"

import { getTestimonials } from "@/services"
import { dispatchProfilePublic } from "@/store"

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
    <section data-profile>
      <div data-footer-profile>
        <div
          data-profile
          onClick={(event) => {
            event.stopPropagation()
            handleProfile()
          }}
        >
          <div data-avatar>
            <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={24} height={24} />
          </div>
          <p>{name}</p>
        </div>
        {rating ? (
          <div data-rating>
            <div data-icon>
              <IconRating />
            </div>
            <span>{rating?.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}

ItemProfile.displayName = "ItemProfile"
export default ItemProfile
