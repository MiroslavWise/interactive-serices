"use client"

import { type IResponseOffers } from "@/services/offers/types"

import Avatar from "@avatar"
import SharedPopupButton from "./SharedPopup"

import { daysAgo, useResize } from "@/helpers"
import { dispatchPublicProfile } from "@/store"

const ItemProfile = ({ offer }: { offer: IResponseOffers }) => {
  const { created, user } = offer ?? {}
  const { isTablet } = useResize()
  const { image, firstName, lastName, id: userId } = user ?? {}

  const name = `${firstName ?? "Имя"} ${lastName ?? ""}`

  return (
    <div className="relative w-full grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-2.5 !px-5 *:!px-0">
      <Avatar className="w-10 h-10 rounded-.625 p-5" image={image} userId={userId} />
      <div data-info className="w-full flex flex-col items-start gap-0.5">
        <div
          data-name
          className="flex flex-row items-center gap-1 cursor-pointer"
          onClick={() => {
            if (!isTablet) {
              dispatchPublicProfile(userId!)
            }
          }}
        >
          <h4 className="text-text-primary text-sm text-left font-medium">{name}</h4>
          <img src="/svg/verified-tick.svg" alt="verified" height={16} width={16} className="ml-1 w-4 h-4" />
        </div>
        <time dateTime={String(created)} className="text-text-secondary font-normal text-[0.8125rem] leading-4">
          {daysAgo(created)}
        </time>
      </div>
      <SharedPopupButton offer={offer} />
    </div>
  )
}

ItemProfile.displayName = "ItemProfile"
export default ItemProfile
