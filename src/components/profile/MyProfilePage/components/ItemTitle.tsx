import Link from "next/link"

import { EnumTypeProvider } from "@/types/enum"
import { IResponseOffers } from "@/services/offers/types"

import IconMap from "@/components/icons/IconMap"
import { ImageCategory } from "@/components/common"
import IconShare from "@/components/icons/IconShare"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import env from "@/config/environment"
import { useOutsideClickEvent } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchMapCoordinates } from "@/store"

const TITLE_SHARE = "Поделиться"
const TITLE_TO_MAP = "Показать на карте"

function ItemTitle({ offer }: { offer: IResponseOffers }) {
  const { title, category, provider, categoryId } = offer ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent(close)
  const { onSimpleMessage } = useToast()

  const titleH2 =
    provider === EnumTypeProvider.alert
      ? title || "SOS-сообщение"
      : provider === EnumTypeProvider.discussion
      ? title || "Обсуждение"
      : provider === EnumTypeProvider.offer
      ? category?.title || "Предложение"
      : null

  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  return (
    <section className="w-full gap-2.5 grid grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
      <div className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:h-6 *:w-6">
        {provider === EnumTypeProvider.offer ? (
          <ImageCategory id={categoryId!} slug={category?.slug} provider={category?.provider} />
        ) : provider === EnumTypeProvider.discussion ? (
          <IconDiscussionBalloon />
        ) : provider === EnumTypeProvider.alert ? (
          <IconAlertCirlceRed />
        ) : null}
      </div>
      <h2 className=" text-text-primary text-base font-semibold line-clamp-2 text-ellipsis">{titleH2}</h2>
      <article
        className="w-6 h-6 relative flex items-center justify-center z-20"
        ref={ref}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setOpen((prev) => !prev)
          }}
          className="w-6 h-6 relative p-3 bg-transparent border-none outline-none *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 z-30 *:pointer-events-none"
        >
          <IconDotsHorizontal />
        </button>
        <section
          className={cx(
            "absolute min-w-[12.5rem] invisible opacity-0 top-full right-0 bg-BG-second p-3 flex flex-col gap-0.5 rounded-xl shadow-box-down z-30",
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
              if (provider === EnumTypeProvider.offer) {
                dispatchBallonOffer({ offer })
              }
              if (provider === EnumTypeProvider.discussion) {
                dispatchBallonDiscussion({ offer })
              }
              if (provider === EnumTypeProvider.alert) {
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
          <a
            title={TITLE_SHARE}
            aria-label={TITLE_SHARE}
            aria-labelledby={TITLE_SHARE}
            onClick={(event) => {
              const url = `${env.server.host}/offer/${offer.id}/${offer.slug ? String(offer.slug).replaceAll("/", "-") : ""}`
              if (!!window.navigator.share!) {
                navigator.share({
                  title: offer.title!,
                  text: offer?.addresses[0] ? offer.addresses[0]?.additional! : "",
                  url: url,
                })
              } else {
                navigator.clipboard.writeText(url)
                onSimpleMessage("Ссылка скопирована")
              }
              event.stopPropagation()
            }}
          >
            <div>
              <IconShare />
            </div>
            <span>{TITLE_SHARE}</span>
          </a>
        </section>
      </article>
    </section>
  )
}

ItemTitle.displayName = "ItemTitle"
export default ItemTitle
