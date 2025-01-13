import { useQuery } from "@tanstack/react-query"

import { IResponseOffers } from "@/services/offers/types"

import SharedPopupButton from "./SharedPopup"
import IconRating from "@/components/icons/IconRating"

import { daysAgo } from "@/helpers"
import { getTestimonials } from "@/services/testimonials"
import { DeclensionAllQuantityFeedback } from "@/lib/declension"

function TimeAndDots({ offer }: { offer: IResponseOffers }) {
  const { created, id, provider } = offer ?? {}

  const { data: testimonials } = useQuery({
    queryFn: () => getTestimonials({ target: id!, provider: provider!, order: "DESC" }),
    queryKey: ["testimonials", provider, id!],
    enabled: !!id,
  })

  const list = testimonials?.data ?? []
  const length = list.length
  const rating = (list.reduce((acc, item) => acc + item.rating, 0) / (length || 1)).toFixed(1)
  const countText = DeclensionAllQuantityFeedback(length)

  return (
    <article className="w-full flex flex-col items-start gap-3">
      <div className="w-full flex flex-row items-center justify-between [&>button]:top-5">
        <time dateTime={String(created)} className="text-text-secondary font-normal text-[0.8125rem] leading-4">
          {daysAgo(created)}
        </time>
        <SharedPopupButton offer={offer} />
      </div>
      {length > 0 ? (
        <div className="flex flex-row items-center gap-1">
          <div className="w-min flex flex-row items-center">
            <div className="relative w-4 h-4 *:w-2.5 *:h-2.5">
              <IconRating />
            </div>
            <span className="whitespace-nowrap text-text-accent text-xs">{rating}</span>
          </div>
          <span className="text-text-secondary text-xs">{countText}</span>
        </div>
      ) : (
        <span className="text-text-secondary text-xs font-light whitespace-nowrap">Ещё нет отзывов</span>
      )}
    </article>
  )
}

TimeAndDots.displayName = "TimeAndDots"
export default TimeAndDots
