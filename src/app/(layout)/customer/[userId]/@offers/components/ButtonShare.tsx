"use client"

import Link from "next/link"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import IconMap from "@/components/icons/IconMap"
import IconShare from "@/components/icons/IconShare"
import IconMapWhite from "@/components/icons/IconMapWhite"
import IconComplaint from "@/components/icons/IconComplaint"
import IconArrowRight from "@/components/icons/IconArrowRight"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"
import {
  dispatchAddTestimonials,
  dispatchBallonAlert,
  dispatchBallonDiscussion,
  dispatchBallonOffer,
  dispatchComplaintModalOffer,
  dispatchMapCoordinates,
  useAuth,
} from "@/store"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import IconStar01 from "@/components/icons/IconStar-01"

const TITLE_TO_MAP = "Показать на карте"
const TITLE_COMPLAINT = "Пожаловаться"
const TITLE_SHARE = "Поделиться"
const LABEL_REVIEW = "Оставить отзыв"

function ButtonShare({ offer }: { offer: IResponseOffers }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent(close)
  const { id, userId: userIdOffer, provider } = offer ?? {}

  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  const onShare = useNavigator({
    url: `/offer/${offer.id}/${offer.slug ? String(offer.slug).replaceAll("/", "-") : ""}`,
    title: offer?.title ?? "",
  })

  function close() {}

  function onReview() {
    dispatchAddTestimonials({ offer, provider: provider })
  }

  return (
    <article
      className="relative flex items-center justify-center z-20"
      ref={ref}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <button
        type="button"
        className="w-4 h-4 relative border-none outline-none *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 z-30"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((prev) => !prev)
        }}
      >
        <IconDotsHorizontal />
      </button>
      <section
        className={cx(
          "absolute min-w-[12.5rem] invisible opacity-0 top-[calc(100%_+_0.25rem)] right-0 bg-BG-second p-3 flex flex-col gap-0.5 rounded-xl shadow-box-down z-30",
          open && "!opacity-100 !visible",
          "*:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:gap-2.5 *:items-center *:py-2 *:px-1.5 *:rounded-md",
          "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
          "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-2.5",
          "hover:*:bg-grey-field",
          "[&>*>div>svg]:w-5 [&>*>div>svg]:h-5 [&>*>div>svg]:absolute [&>*>div>svg]:top-1/2 [&>*>div>svg]:left-1/2 [&>*>div>svg]:-translate-x-1/2 [&>*>div>svg]:-translate-y-1/2",
        )}
      >
        <Link
          href={{ pathname: "/" }}
          title={TITLE_TO_MAP}
          aria-label={TITLE_TO_MAP}
          aria-labelledby={TITLE_TO_MAP}
          onClick={() => {
            if (offer.provider === EnumTypeProvider.offer) {
              dispatchBallonOffer({ offer })
            }
            if (offer.provider === EnumTypeProvider.discussion) {
              dispatchBallonDiscussion({ offer })
            }
            if (offer.provider === EnumTypeProvider.alert) {
              dispatchBallonAlert({ offer })
            }
            if (geoData) {
              dispatchMapCoordinates({
                zoom: 17,
                coordinates: geoData?.coordinates?.split(" ")?.map(Number),
              })
            }
          }}
        >
          <div>
            <IconMap />
          </div>
          <span>{TITLE_TO_MAP}</span>
        </Link>
        <a title={TITLE_SHARE} aria-label={TITLE_SHARE} aria-labelledby={TITLE_SHARE} onClick={onShare}>
          <div>
            <IconShare />
          </div>
          <span>{TITLE_SHARE}</span>
        </a>
        <a
          title={LABEL_REVIEW}
          aria-label={LABEL_REVIEW}
          aria-labelledby={LABEL_REVIEW}
          onClick={onReview}
          className={cx((userIdOffer === userId || !userId) && "!hidden")}
        >
          <div>
            <IconStar01 />
          </div>
          <span>{LABEL_REVIEW}</span>
        </a>
        <a
          title={TITLE_COMPLAINT}
          aria-label={TITLE_COMPLAINT}
          aria-labelledby={TITLE_COMPLAINT}
          onClick={(event) => {
            console.log("onClick TITLE_COMPLAINT: ")
            event.stopPropagation()
            event.preventDefault()
            dispatchComplaintModalOffer({ offer })
            setOpen(false)
          }}
        >
          <div>
            <IconComplaint />
          </div>
          <span className="!text-text-error">{TITLE_COMPLAINT}</span>
        </a>
      </section>
    </article>
  )
}

export const LinkToMap = ({ offer }: { offer: IResponseOffers }) => {
  const { addresses } = offer ?? {}
  const firstAddress = addresses?.[0]
  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.region}, `, "") ?? ""

  return (
    <Link
      className="w-full cursor-pointer items-start place-items-start grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] gap-2 mt-auto"
      onClick={() => {
        if (firstAddress) {
          dispatchMapCoordinates({
            zoom: 17,
            coordinates: firstAddress?.coordinates?.split(" ")?.map(Number),
          })
        }
      }}
      href={{ pathname: "/" }}
    >
      <div className="relative w-6 h-6 p-3 rounded-xl bg-element-accent-1 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[0.9rem] *:h-[0.9rem]">
        <IconMapWhite />
      </div>
      <p
        className="text-text-primary text-sm text-nowrap whitespace-nowrap text-start font-normal line-clamp-1 text-ellipsis overflow-hidden w-[inherit]"
        title={additional}
        aria-label={additional}
        aria-labelledby={additional}
      >
        {additional}
      </p>
      <div className="w-5 h-5 p-2.5  relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
        <IconArrowRight />
      </div>
    </Link>
  )
}

ButtonShare.displayName = "ButtonShare"
export default ButtonShare
