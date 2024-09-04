import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IUserOffer } from "@/services/offers/types"

import Avatar from "@avatar"
import IconRating from "@/components/icons/IconRating"

import { getTestimonials } from "@/services"

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
    <section className="w-full flex flex-row items-center justify-between gap-4 pt-2.5 border-t border-solid border-grey-stroke-light mt-auto">
      <div className="w-full grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2.5 items-center">
        <Avatar className="w-6 h-6 p-3 rounded-md" image={image} />
        <p className="text-text-primary text-sm font-normal">
          {firstName || "Имя"} {lastName || "Фамилия"}
        </p>
      </div>
      {rating ? (
        <div className="flex flex-row items-center">
          <div className="w-4 h-4 p-[0.1875rem] flex items-center justify-center *:w-2.5 *:h-2.5">
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
