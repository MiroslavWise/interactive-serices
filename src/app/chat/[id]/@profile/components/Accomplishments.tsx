"use client"

import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"
import { type IUserResponse } from "@/services/users/types"

import { badges, ICON } from "@/app/customer/[userId]/components/Accomplishments"

import { getTestimonials } from "@/services"

function Accomplishments({ user }: { user: IUserResponse }) {
  const { id } = user ?? {}
  const { data: dataTestimonials, isLoading } = useQuery({
    queryFn: () => getTestimonials({ receiver: id, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const itemsAllBarters = user?.barters?.filter((_) => _.status === EnumStatusBarter.COMPLETED) || []
  const itemsTestimonials = dataTestimonials?.data || []

  const lengthAllBarters = itemsAllBarters.length
  const lengthTestimonials = itemsTestimonials.length
  const averageRating = Number(
    itemsTestimonials.reduce((acc, cur) => acc + Number(cur.rating ?? 0), 0) / (lengthTestimonials || 1),
  ).toFixed(1)

  if (isLoading)
    return (
      <article className="loading-screen w-full grid grid-cols-3 gap-2 py-2.5">
        {[1234, 341234, 234512].map((item) => (
          <div
            key={`::key::load::${item}::`}
            className="border border-solid border-grey-stroke-light rounded-2xl w-full p-2.5 flex flex-col gap-2 items-start *:w-full"
          >
            <span className="h-2 rounded-[0.25rem]" />
            <span className="max-w-[60%] h-4 rounded-lg" />
          </div>
        ))}
      </article>
    )

  return (
    <div className="w-full grid grid-cols-3 gap-2 py-2.5">
      {badges({ feedback: lengthTestimonials, rating: averageRating, barters: lengthAllBarters }).map(({ title, count, id }) => (
        <div key={`::key::item::${id}::`} className="w-full flex flex-col gap-0.5 bg-grey-field rounded-[0.625rem] py-1.5 px-3">
          <article className="w-full flex flex-row gap-1 items-center [&>svg]:w-3 [&>svg]:h-3">
            <p className="text-text-primary text-xs font-normal">{title}</p>
            {ICON[id]}
          </article>
          <h3 className="text-text-primary text-start text-sm font-semibold">{count}</h3>
        </div>
      ))}
    </div>
  )
}

Accomplishments.displayName = "Accomplishments"
export default Accomplishments
