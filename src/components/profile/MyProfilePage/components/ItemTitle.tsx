import Link from "next/link"

import { EnumTypeProvider } from "@/types/enum"
import { ETitleRole } from "@/services/roles/types"
import { IResponseOffers } from "@/services/offers/types"

import IconMap from "@/components/icons/IconMap"
import { ImageCategory } from "@/components/common"
import IconShare from "@/components/icons/IconShare"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { cx } from "@/lib/cx"
import useRole from "@/helpers/is-role"
import { useOutsideClickEvent } from "@/helpers"
import { titleOffer } from "@/utils/title-offer"
import { useNavigator } from "@/helpers/hooks/use-navigator"
import { dispatchBallonAlert, dispatchBallonDiscussion, dispatchBallonOffer, dispatchMapCoordinates, displayAddAdvert } from "@/store"

const TITLE_SHARE = "Поделиться"
const TITLE_TO_MAP = "Показать на карте"
const LABEL_ADD_ADVERT = "Добавить рекламу"

function ItemTitle({ offer }: { offer: IResponseOffers }) {
  const { title, category, provider, categoryId, urgent, company, id } = offer ?? {}
  const [open, setOpen, ref] = useOutsideClickEvent(close)

  const geoData = offer?.addresses?.length > 0 ? offer?.addresses[0] : null

  const onShare = useNavigator({
    url: `/offer/${offer.id}/${offer.slug ? String(offer.slug).replaceAll("/", "-") : ""}`,
    title: titleOffer(title, provider)! ?? "",
  })

  const isAdvertising = !!company
  const isManager = useRole(ETitleRole.Manager)

  return (
    <section className="w-full gap-2.5 grid grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
      <div className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:h-6 *:w-6">
        {provider === EnumTypeProvider.offer ? (
          <ImageCategory id={categoryId!} slug={category?.slug} provider={category?.provider} isUrgent={!!urgent} />
        ) : provider === EnumTypeProvider.discussion ? (
          <IconDiscussionBalloon />
        ) : provider === EnumTypeProvider.alert ? (
          <IconAlertCirlceRed />
        ) : null}
      </div>
      <h2 className=" text-text-primary text-base font-semibold line-clamp-2 text-ellipsis">{titleOffer(title, provider)}</h2>
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
            "hover:*:bg-grey-field *:cursor-pointer",
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
          <a title={TITLE_SHARE} aria-label={TITLE_SHARE} aria-labelledby={TITLE_SHARE} onClick={onShare}>
            <div>
              <IconShare />
            </div>
            <span>{TITLE_SHARE}</span>
          </a>
          <a
            title={LABEL_ADD_ADVERT}
            aria-label={LABEL_ADD_ADVERT}
            aria-labelledby={LABEL_ADD_ADVERT}
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              displayAddAdvert(provider!, id!)
            }}
            className={cx((!isManager || isAdvertising) && "!hidden")}
          >
            <div>
              <IconShare />
            </div>
            <span>{LABEL_ADD_ADVERT}</span>
          </a>
        </section>
      </article>
    </section>
  )
}

ItemTitle.displayName = "ItemTitle"
export default ItemTitle
