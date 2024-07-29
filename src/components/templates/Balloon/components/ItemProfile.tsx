"use client"

import Link from "next/link"

import { type IResponseOffers } from "@/services/offers/types"

import SharedPopupButton from "./SharedPopup"
import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { daysAgo, useResize } from "@/helpers"
import { dispatchPublicProfile } from "@/store"
import { cx } from "@/lib/cx"

const ItemProfile = ({ offer }: { offer: IResponseOffers }) => {
  const { created, user } = offer ?? {}
  const { isTablet } = useResize()
  const { image, firstName, lastName, id: userId } = user ?? {}

  const name = `${firstName || "Имя"} ${lastName || "Фамилия"}`

  return (
    <div className="relative w-full grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-2.5 !px-5 *:!px-0">
      <Link
        className={cx("w-10 h-10 rounded-[0.625rem] !p-5 relative overflow-hidden block", !image ? "bg-grey-stroke-light" : "")}
        href={
          !isTablet
            ? {}
            : {
                pathname: `/customer/${userId}`,
                query: {
                  provider: offer.provider,
                },
              }
        }
        onClick={() => {
          if (!isTablet) {
            dispatchPublicProfile(userId!)
          }
        }}
        title={`Перейти к пользователю ${name}`}
        aria-label={`Перейти к пользователю ${name}`}
        aria-labelledby={`Перейти к пользователю ${name}`}
      >
        {!!image ? (
          <NextImageMotion
            className="overflow-hidden w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={image?.attributes?.url}
            alt="avatar"
            width={60}
            height={60}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6" />
        )}
      </Link>
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
