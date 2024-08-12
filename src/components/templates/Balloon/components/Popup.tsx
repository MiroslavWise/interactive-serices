"use client"

import { usePathname } from "next/navigation"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import IconMap from "@/components/icons/IconMap"
import IconActivity from "@/components/icons/IconActivity"
import IconAlertCircle from "@/components/icons/IconAlertCircle"

import {
  dispatchBallonAlert,
  dispatchBallonDiscussion,
  dispatchBallonOffer,
  dispatchComplaintModalUser,
  dispatchMapCoordinates,
} from "@/store"
import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useToast } from "@/helpers/hooks/useToast"

const LABEL_MAP = "Показать на карте"
const LABEL_SHARE = "Поделиться"
const LABEL_COMPLAIN = "Пожаловаться"

export const PopupShared = ({ offer, visible }: { offer: IResponseOffers; visible: boolean }) => {
  const { user, id, addresses, title, slug } = offer ?? {}
  const { onSimpleMessage } = useToast()
  const pathname = usePathname()

  const isMap = pathname !== "/"
  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  console.log("isMap: ", isMap)

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
        user: user,
      })
      return
    }
  }

  return (
    <article
      data-active={visible}
      className={cx(
        "fixed md:absolute top-auto md:top-5 max-md:left-0 max-md:bottom-0 right-0 w-full md:w-[13.5rem] h-auto p-5 md:p-3 max-md:pt-9 flex flex-col gap-0.125 shadow-box-down rounded-t-3xl md:rounded-xl bg-BG-second",
        visible ? "!z-10 !opacity-100 !visible" : "-z-10 opacity-0 invisible",
        "*:w-full *:py-2 *:px-0.375 *:flex *:flex-row *:items-center *:justify-start *:gap-0.625 *:rounded-[0.375rem] hover:*:bg-grey-field",
      )}
    >
      <a
        title={LABEL_MAP}
        aria-label={LABEL_MAP}
        aria-labelledby={LABEL_MAP}
        className={isMap ? "" : "!hidden"}
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
        <div
          className={cx(
            "w-5 h-5 flex items-center justify-center relative p-0.625",
            "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5",
          )}
        >
          <IconMap />
        </div>
        <span className="text-text-primary text-sm font-normal text-left">{LABEL_MAP}</span>
      </a>
      <a
        title={LABEL_SHARE}
        aria-label={LABEL_SHARE}
        aria-labelledby={LABEL_SHARE}
        onClick={(event) => {
          const url = `${env.server.host}/offer/${id}/${String(slug).replaceAll("/", "-")}`
          if (!!window.navigator.share!) {
            navigator.share({
              title: title!,
              text: addresses[0] ? addresses[0]?.additional! : "",
              url: url,
            })
          } else {
            navigator.clipboard.writeText(url)
            onSimpleMessage("Ссылка скопирована")
          }
          event.stopPropagation()
        }}
      >
        <div
          className={cx(
            "w-5 h-5 flex items-center justify-center relative p-0.625",
            "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5",
          )}
        >
          <IconActivity />
        </div>
        <span className="text-text-primary text-sm font-normal text-left">Поделиться</span>
      </a>
      <a onClick={handle} title={LABEL_COMPLAIN} aria-label={LABEL_COMPLAIN} aria-labelledby={LABEL_COMPLAIN}>
        <div
          className={cx(
            "w-5 h-5 flex items-center justify-center relative p-0.625",
            "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5",
          )}
        >
          <IconAlertCircle />
        </div>
        <span className="text-text-error text-sm font-normal text-left">{LABEL_COMPLAIN}</span>
      </a>
    </article>
  )
}
