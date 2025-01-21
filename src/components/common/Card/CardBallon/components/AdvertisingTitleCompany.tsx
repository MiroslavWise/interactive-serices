import { IPosts } from "@/services/posts/types"
import { EnumTypeProvider } from "@/types/enum"
import { ICompany } from "@/services/types/company"
import { IResponseOffers } from "@/services/offers/types"

import IconRating from "@/components/icons/IconRating"
import { NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useQuery } from "@tanstack/react-query"
import { getTestimonials } from "@/services"
import { DeclensionAllQuantityFeedback } from "@/lib/declension"

interface IProps {
  company: ICompany
  offer?: IResponseOffers
  post?: IPosts
  provider: EnumTypeProvider
}

function AdvertisingTitleCompany({ company, offer, post, provider }: IProps) {
  const { title = "" } = provider === EnumTypeProvider.POST ? post ?? {} : offer ?? {}
  const { image } = company ?? {}

  const { addresses: postAddresses, id: postId } = post ?? {}
  const { addresses: offerAddresses, id: offerId } = offer ?? {}
  const address =
    provider === EnumTypeProvider.offer
      ? offerAddresses && offerAddresses.length > 0 && offerAddresses[0].additional
      : provider === EnumTypeProvider.POST
      ? postAddresses && postAddresses.length > 0 && postAddresses[0].additional
      : null
  const id = provider === EnumTypeProvider.offer ? offerId : provider === EnumTypeProvider.POST ? postId : null

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
    <div className="w-full flex flex-col gap-1">
      <section className={cx("w-full", image ? "grid gap-2 grid-cols-[minmax(0,1fr)_2.5rem]" : "flex")}>
        <div className="w-full flex flex-col items-start justify-between gap-1">
          <h2 className="text-text-primary text-base font-bold text-ellipsis line-clamp-2">{title ?? ""}</h2>
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
        </div>
        <div className={cx("rounded-md overflow-hidden w-10 h-10 cursor-pointer", image ? "relative" : "hidden")}>
          {image ? (
            <NextImageMotion
              src={image.attributes.url}
              hash={image.attributes.blur}
              alt={title! ?? ""}
              width={80}
              height={80}
              className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            />
          ) : null}
        </div>
      </section>
      {!!address && <span className="text-text-secondary text-xs font-normal line-clamp-3 text-ellipsis cursor-pointer">{address}</span>}
    </div>
  )
}

AdvertisingTitleCompany.displayName = "AdvertisingTitleCompany"
export default AdvertisingTitleCompany
