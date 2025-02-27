"use client"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"
import { daysAgo, useOutsideClickEvent } from "@/helpers"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import {
  useAuth,
  displayAddAdvert,
  dispatchUpdateOffer,
  dispatchAddTestimonials,
  dispatchComplaintModalOffer,
  dispatchUpdateDiscussionAndAlert,
} from "@/store"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

const LABEL_REPLACE = "Редактировать"
const TITLE_SHARE = "Поделиться"
const TITLE_COMPLAINT = "Пожаловаться"
const LABEL_ADD_ADVERT = "Добавить рекламу"
const LABEL_REVIEW = "Оставить отзыв"

function HeaderTimeDots({ offer }: { offer: IResponseOffers }) {
  const [visible, setVisible, ref] = useOutsideClickEvent()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const isEdit = useIsAllowAccess("PATCH", "posts")
  const isAddAdvert = useIsAllowAccess("PATCH", "companies")

  const isAdvertising = !!offer?.company

  const onShare = useNavigator({
    url: `/offer/${offer.id}/${offer.slug ? String(offer.slug).replaceAll("/", "-") : ""}`,
    title: offer.title! ?? "",
  })

  function onReview() {
    dispatchAddTestimonials({ offer, provider: offer.provider })
  }

  function onReplace(event: any) {
    event.stopPropagation()
    if (offer?.provider === EnumTypeProvider.offer) {
      dispatchUpdateOffer(true, offer)
    } else if (EnumTypeProvider.alert === offer?.provider!) {
      dispatchUpdateDiscussionAndAlert({ offer: offer!, visible: true })
    }
  }

  return (
    <div data-time-dots className="w-full h-auto flex items-center justify-between">
      <time dateTime={String(offer?.created)} className="w-full text-text-secondary text-start text-xs font-normal">
        {daysAgo(offer?.created)}
      </time>
      <div
        data-dots-and-button
        className="relative h-4 w-4 border-none outline-none bg-transparent flex items-center justify-center z-[91]"
      >
        <button
          className="absolute bg-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 z-50 *:h-4 *:w-4 flex items-center justify-center text-element-grey-light hover:text-element-accent-1"
          ref={ref}
          onClick={(event) => {
            event.stopPropagation()
            setVisible((prev) => !prev)
          }}
        >
          <IconSprite id="dots-horizontal" />
        </button>
        <article
          className={cx(
            "absolute top-[calc(100%_+_0.25rem)] right-0 rounded-xl p-3 bg-BG-second w-[13.5rem] flex flex-col gap-0.5 shadow-box-down",
            "*:grid *:grid-cols-[1.25rem_minmax(0,1fr)] *:gap-2.5 *:items-center *:py-2 *:px-1.5 *:rounded-md",
            "[&>*>span]:text-text-primary [&>*>span]:text-sm [&>*>span]:font-normal [&>*>span]:text-left [&>*>span]:whitespace-nowrap",
            "[&>*>div]:w-5 [&>*>div]:h-5  [&>*>div]:relative  [&>*>div]:p-2.5",
            "hover:*:bg-grey-field",
            visible ? "opacity-100 visible -z-10" : "opacity-0 invisible z-[120]",
          )}
        >
          <a
            title={LABEL_REPLACE}
            aria-label={LABEL_REPLACE}
            aria-labelledby={LABEL_REPLACE}
            onClick={onReplace}
            className={cx(!isEdit && "!hidden")}
          >
            <div className="relative w-5 h-5 *:w-5 *:h-5">
              <IconSprite id="icon-edit" />
            </div>
            <span>{LABEL_REPLACE}</span>
          </a>
          <a title={TITLE_SHARE} aria-label={TITLE_SHARE} aria-labelledby={TITLE_SHARE} onClick={onShare}>
            <div>
              <IconSprite id="icon-share" className="w-5 h-5 text-text-primary" />
            </div>
            <span>{TITLE_SHARE}</span>
          </a>
          <a
            title={LABEL_REVIEW}
            aria-label={LABEL_REVIEW}
            aria-labelledby={LABEL_REVIEW}
            onClick={(event) => {
              event.stopPropagation()
              onReview()
            }}
            className={cx((offer?.userId === userId || !userId) && "!hidden")}
          >
            <div>
              <IconSprite id="icon-star" className="text-text-primary w-5 h-5" />
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
              setVisible(false)
            }}
          >
            <div>
              <IconSprite id="icon-complaint" className="text-text-error w-5 h-5" />
            </div>
            <span className="!text-text-error">{TITLE_COMPLAINT}</span>
          </a>
          <a
            title={LABEL_ADD_ADVERT}
            aria-label={LABEL_ADD_ADVERT}
            aria-labelledby={LABEL_ADD_ADVERT}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              displayAddAdvert(offer?.provider!, offer?.id!, offer?.userId!)
              setVisible(false)
            }}
            className={cx((!isAddAdvert || offer.provider !== EnumTypeProvider.offer || isAdvertising) && "!hidden")}
          >
            <div>
              <IconSprite id="icon-default-currency-ruble-circle" className="text-text-primary w-5 h-5" />
            </div>
            <span>{LABEL_ADD_ADVERT}</span>
          </a>
        </article>
      </div>
    </div>
  )
}

HeaderTimeDots.displayName = "HeaderTimeDots"
export default HeaderTimeDots
