"use client"

import { usePathname, useRouter } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import IconActivity from "@/components/icons/IconActivity"
import { IconSprite } from "@/components/icons/icon-sprite"
import IconAlertCircle from "@/components/icons/IconAlertCircle"

import { cx } from "@/lib/cx"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import {
  dispatchAddTestimonials,
  dispatchComplaintModalOffer,
  dispatchMapCoordinates,
  dispatchUpdateDiscussionAndAlert,
  dispatchUpdateOffer,
  displayAddAdvert,
  useAuth,
} from "@/store"
import { useIsAllowAccess } from "@/helpers/hooks/use-roles-allow-access"

const LABEL_EDIT = "Редактировать"
const LABEL_MAP = "Показать на карте"
const LABEL_SHARE = "Поделиться"
const LABEL_COMPLAIN = "Пожаловаться"
const LABEL_ADD_ADVERT = "Добавить рекламу"
const LABEL_REVIEW = "Оставить отзыв"

export const PopupShared = ({ offer, visible }: { offer: IResponseOffers; visible: boolean }) => {
  const { user, id, addresses, title, slug, userId: offerUserId, provider, company } = offer ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const isAdvertising = !!company
  const isEdit = useIsAllowAccess("PATCH", "offers")
  const isManager = useIsAllowAccess("PATCH", "companies")

  const pathname = usePathname()
  const { push } = useRouter()

  const isMap = pathname === "/"
  const geoData = addresses?.length > 0 ? addresses[0] : null

  function handle() {
    if (user) {
      dispatchComplaintModalOffer({
        offer: offer,
      })
      return
    }
  }

  const onShare = useNavigator({
    url: `/offer/${id}/${slug ? String(slug).replaceAll("/", "-") : ""}`,
    title: title! ?? "",
  })

  function onReview() {
    dispatchAddTestimonials({ offer, provider: provider })
  }

  return (
    <article
      data-active={visible}
      className={cx(
        "fixed md:absolute top-auto md:top-5 max-md:left-0 max-md:bottom-0 right-0 w-full md:w-[13.5rem] h-auto p-5 md:p-3 max-md:pt-9 flex flex-col gap-0.5 shadow-box-down rounded-t-3xl md:rounded-xl bg-BG-second",
        visible ? "!z-10 !opacity-100 !visible" : "-z-10 opacity-0 invisible",
        "*:w-full *:py-2 *:px-1.5 *:flex *:flex-row *:items-center *:justify-start *:gap-2.5 *:rounded-[0.375rem] hover:*:bg-grey-field",
      )}
    >
      <a
        title={LABEL_EDIT}
        aria-label={LABEL_EDIT}
        aria-labelledby={LABEL_EDIT}
        onClick={(event) => {
          event.stopPropagation()
          if (provider === EnumTypeProvider.offer) {
            dispatchUpdateOffer(true, offer)
          } else if (provider === EnumTypeProvider.alert) {
            dispatchUpdateDiscussionAndAlert({ offer: offer!, visible: true })
          }
        }}
        className={cx("text-text-primary", offerUserId === userId || isEdit ? "flex" : "!hidden")}
      >
        <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
          <IconSprite id="icon-edit" className="w-5 h-5 " />
        </div>
        <span className="text-sm font-normal text-left">{LABEL_EDIT}</span>
      </a>
      <a
        title={LABEL_MAP}
        aria-label={LABEL_MAP}
        aria-labelledby={LABEL_MAP}
        className={(isMap && "!hidden") || undefined}
        onClick={() => {
          if (geoData) {
            dispatchMapCoordinates({
              zoom: 17,
              coordinates: geoData?.coordinates?.split(" ")?.map(Number),
            })
          }
          if (!isMap) {
            push("/", { scroll: false })
          }
        }}
      >
        <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
          <IconSprite id="icon-default-map" className="w-5 h-5 text-text-primary" />
        </div>
        <span className="text-text-primary text-sm font-normal text-left">{LABEL_MAP}</span>
      </a>
      <a title={LABEL_SHARE} aria-label={LABEL_SHARE} aria-labelledby={LABEL_SHARE} onClick={onShare}>
        <div
          className={cx(
            "w-5 h-5 flex items-center justify-center relative p-2.5",
            "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
          )}
        >
          <IconActivity />
        </div>
        <span className="text-text-primary text-sm font-normal text-left">{LABEL_SHARE}</span>
      </a>
      <a
        onClick={onReview}
        title={LABEL_REVIEW}
        aria-label={LABEL_REVIEW}
        aria-labelledby={LABEL_REVIEW}
        className={cx((offerUserId === userId || !userId) && "!hidden")}
      >
        <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
          <IconSprite id="icon-star" className="text-text-primary w-5 h-5" />
        </div>
        <span className="text-text-primary text-sm font-normal text-left">{LABEL_REVIEW}</span>
      </a>
      <a onClick={handle} title={LABEL_COMPLAIN} aria-label={LABEL_COMPLAIN} aria-labelledby={LABEL_COMPLAIN}>
        <div
          className={cx(
            "w-5 h-5 flex items-center justify-center relative p-2.5",
            "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5",
          )}
        >
          <IconAlertCircle />
        </div>
        <span className="text-text-error text-sm font-normal text-left">{LABEL_COMPLAIN}</span>
      </a>
      <a
        onClick={() => displayAddAdvert(offer?.provider!, offer?.id!, offer?.userId!)}
        title={LABEL_ADD_ADVERT}
        aria-label={LABEL_ADD_ADVERT}
        aria-labelledby={LABEL_ADD_ADVERT}
        className={cx((!isManager || provider !== EnumTypeProvider.offer || isAdvertising) && "!hidden")}
      >
        <div className="w-5 h-5 flex items-center justify-center relative p-2.5">
          <IconSprite id="icon-default-currency-ruble-circle" className="text-text-primary w-5 h-5" />
        </div>
        <span className="text-text-primary text-sm font-normal text-left">{LABEL_ADD_ADVERT}</span>
      </a>
    </article>
  )
}
