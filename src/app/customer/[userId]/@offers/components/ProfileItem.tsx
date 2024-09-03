import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IUserOffer } from "@/services/offers/types"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { getTestimonials } from "@/services"
import IconRating from "@/components/icons/IconRating"

interface IProps {
  user: IUserOffer
}

function ProfileItem({ user }: IProps) {
  const { image, firstName, lastName, id } = user ?? {}

  const { data: dataTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: id!, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
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

  return (
    <section className="w-full flex flex-row items-center justify-between gap-4 pt-2.5 border-t-[1px] border-solid border-grey-stroke-light mt-auto">
      <div className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2.5 items-center">
        <div
          className={`relative w-6 h-6 p-3 rounded-md overflow-hidden [&>img]:absolute [&>img]:top-1/2 [&>img]:left-1/2 [&>img]:-translate-x-1/2 [&>img]:-translate-y-1/2 [&>img]:w-6 [&>img]:h-6 ${
            !image && "bg-grey-stroke-light !p-1 [&>svg]:w-4 [&>svg]:h-4"
          }`}
        >
          {!!image ? <NextImageMotion src={image?.attributes?.url} alt="avatar" width={60} height={60} /> : <IconEmptyProfile />}
        </div>
        <p className="text-text-primary text-sm font-normal">
          {firstName || "Имя"} {lastName || "Фамилия"}
        </p>
      </div>
      {rating ? (
        <div className="flex flex-row items-center">
          <div className="w-4 h-4 p-[0.1875rem] flex items-center justify-center [&>svg]:w-0.625 [&>svg]:h-0.625">
            <IconRating />
          </div>
          <span className="text-text-accent text-xs font-medium">{rating?.toFixed(1)}</span>
        </div>
      ) : null}
    </section>
  )
}

ProfileItem.displayName = "ProfileItem"
export default memo(ProfileItem)
