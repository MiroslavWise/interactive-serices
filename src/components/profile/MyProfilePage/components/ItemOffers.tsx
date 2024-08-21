import Link from "next/link"

import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type IResponseOffers } from "@/services/offers/types"

import ItemTitle from "./ItemTitle"
import IconHelp from "@/components/icons/IconHelp"
import ItemServiceImages from "./ItemServiceImages"
import IconMapWhite from "@/components/icons/IconMapWhite"
import IconArrowRight from "@/components/icons/IconArrowRight"

import {
  dispatchBallonAlert,
  dispatchBallonDiscussion,
  dispatchBallonOffer,
  dispatchDeleteOffer,
  dispatchMapCoordinates,
  dispatchUpdateDiscussionAndAlert,
  dispatchUpdateOffer,
} from "@/store"
import { Button } from "@/components/common"
import { cx } from "@/lib/cx"

function ItemOffers({ offer }: { offer: IResponseOffers }) {
  const { images, description, addresses, provider, id, urgent } = offer ?? {}

  const firstAddress = addresses.length ? addresses[0] : null
  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.region}, `, "") ?? ""

  function handle() {
    if (provider === EnumTypeProvider.offer) {
      dispatchBallonOffer({ offer })
    }
    if (provider === EnumTypeProvider.discussion) {
      dispatchBallonDiscussion({ offer })
    }
    if (provider === EnumTypeProvider.alert) {
      dispatchBallonAlert({ offer })
    }
  }

  function handleUpdate() {
    if (provider === EnumTypeProvider.offer) {
      dispatchUpdateOffer(true, offer)
    } else if ([EnumTypeProvider.discussion, EnumTypeProvider.alert].includes(provider)) {
      dispatchUpdateDiscussionAndAlert({ offer: offer!, visible: true })
    }
  }

  return (
    <li className="w-full bg-BG-second rounded-2xl flex flex-col overflow-hidden" onClick={handle}>
      <article
        className={cx(
          "w-full [background:linear-gradient(101deg,_#F56B59_0%,_#FA4E80_100%)] flex-row items-center justify-center gap-2 py-1.5 px-2.5",
          !!urgent ? "flex" : "hidden",
        )}
      >
        <div className="w-4 h-4 relative">
          <IconHelp />
        </div>
        <span className="text-text-button text-xs font-medium">Помощь Курску</span>
      </article>
      <section className="w-full p-4 flex flex-col gap-3">
        <ItemTitle offer={offer} />
        <article className="w-full flex flex-col gap-4 h-full">
          <section className="w-full flex flex-col gap-3 h-full">
            <p className="text-text-primary text-sm font-normal text-ellipsis overflow-hidden line-clamp-4">{description || ""}</p>
            <ItemServiceImages images={images} />
            <Link
              href={{ pathname: "/" }}
              onClick={() => {
                if (firstAddress) {
                  dispatchMapCoordinates({
                    zoom: 17,
                    coordinates: firstAddress?.coordinates?.split(" ")?.map(Number),
                  })
                }
              }}
              className="w-full cursor-pointer items-start place-items-start grid grid-cols-[1.5rem_minmax(0,1fr)_1.25rem] gap-2 mt-auto"
            >
              <div className="relative w-6 h-6 p-3 rounded-xl bg-element-accent-1 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-[0.9rem] [&>svg]:h-[0.9rem]">
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
              <div className="w-5 h-5 p-0.625  relative [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-5 [&>svg]:h-5">
                <IconArrowRight />
              </div>
            </Link>
            <footer className="w-full *:h-9 *:rounded-[1.125rem] grid grid-cols-[minmax(0,1fr)_2.25rem] gap-3">
              <Button
                type="button"
                typeButton="regular-primary"
                label="Редактировать"
                onClick={(event) => {
                  event.stopPropagation()
                  handleUpdate()
                }}
              />
              <button
                type="button"
                className="relative w-9 bg-grey-field p-[1.125rem]"
                title="Удалить"
                aria-label="Удалить"
                aria-labelledby="Удалить"
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchDeleteOffer({ visible: true, idOffer: id!, provider })
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.4415 0.734375H8.55537C8.90862 0.734366 9.20941 0.734357 9.45636 0.754534C9.7158 0.775731 9.9682 0.822154 10.2095 0.945097C10.5733 1.13045 10.869 1.42621 11.0544 1.78999C11.1773 2.03128 11.2237 2.28368 11.2449 2.54312C11.2643 2.77998 11.2651 3.06636 11.2651 3.40104H13.9984C14.3298 3.40104 14.5984 3.66967 14.5984 4.00104C14.5984 4.33241 14.3298 4.60104 13.9984 4.60104H13.2651V11.4928C13.2651 12.0315 13.2651 12.4721 13.2359 12.8302C13.2056 13.2008 13.141 13.5355 12.9817 13.8481C12.7325 14.3373 12.3347 14.7351 11.8455 14.9843C11.5329 15.1436 11.1982 15.2082 10.8276 15.2385C10.4695 15.2677 10.0289 15.2677 9.49022 15.2677H6.50665C5.96794 15.2677 5.52737 15.2677 5.16932 15.2385C4.79871 15.2082 4.46399 15.1436 4.1514 14.9843C3.66217 14.7351 3.26442 14.3373 3.01515 13.8481C2.85588 13.5355 2.79129 13.2008 2.76101 12.8302C2.73176 12.4721 2.73176 12.0315 2.73177 11.4928L2.73177 4.60104H1.99844C1.66707 4.60104 1.39844 4.33241 1.39844 4.00104C1.39844 3.66967 1.66707 3.40104 1.99844 3.40104H4.73177C4.73179 3.06636 4.73258 2.77998 4.75193 2.54312C4.77313 2.28368 4.81955 2.03128 4.94249 1.78999C5.12785 1.42621 5.42361 1.13045 5.78739 0.945097C6.02868 0.822154 6.28107 0.775731 6.54051 0.754534C6.78747 0.734357 7.08826 0.734366 7.4415 0.734375ZM3.93177 4.60104V11.4677C3.93177 12.0377 3.93224 12.429 3.95703 12.7324C3.98124 13.0288 4.02565 13.1881 4.08436 13.3033C4.21858 13.5667 4.43276 13.7809 4.69618 13.9151C4.81142 13.9738 4.97063 14.0182 5.26703 14.0425C5.57044 14.0672 5.96182 14.0677 6.53177 14.0677H9.4651C10.0351 14.0677 10.4264 14.0672 10.7298 14.0425C11.0262 14.0182 11.1855 13.9738 11.3007 13.9151C11.5641 13.7809 11.7783 13.5667 11.9125 13.3033C11.9712 13.1881 12.0156 13.0288 12.0398 12.7324C12.0646 12.429 12.0651 12.0377 12.0651 11.4677V4.60104H3.93177ZM10.0651 3.40104H5.93178C5.93188 3.0549 5.93317 2.8217 5.94794 2.64084C5.96308 2.45561 5.98932 2.37871 6.0117 2.33478C6.08201 2.1968 6.19419 2.08461 6.33218 2.0143C6.3761 1.99192 6.453 1.96568 6.63823 1.95055C6.83047 1.93484 7.08184 1.93438 7.4651 1.93438H8.53177C8.91504 1.93438 9.16641 1.93484 9.35864 1.95055C9.54387 1.96568 9.62077 1.99192 9.6647 2.0143C9.80268 2.08461 9.91487 2.1968 9.98518 2.33478C10.0076 2.37871 10.0338 2.45561 10.0489 2.64084C10.0637 2.8217 10.065 3.0549 10.0651 3.40104ZM6.6651 7.06771C6.99648 7.06771 7.2651 7.33634 7.2651 7.66771V11.001C7.2651 11.3324 6.99648 11.601 6.6651 11.601C6.33373 11.601 6.0651 11.3324 6.0651 11.001V7.66771C6.0651 7.33634 6.33373 7.06771 6.6651 7.06771ZM9.33177 7.06771C9.66314 7.06771 9.93177 7.33634 9.93177 7.66771V11.001C9.93177 11.3324 9.66314 11.601 9.33177 11.601C9.0004 11.601 8.73177 11.3324 8.73177 11.001V7.66771C8.73177 7.33634 9.0004 7.06771 9.33177 7.06771Z"
                    fill="var(--text-secondary)"
                    className="fill-text-secondary"
                  />
                </svg>
              </button>
            </footer>
          </section>
        </article>
      </section>
    </li>
  )
}

ItemOffers.displayName = "ItemOffers"
export default ItemOffers
