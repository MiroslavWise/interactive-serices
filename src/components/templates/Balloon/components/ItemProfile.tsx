"use client"

import Link from "next/link"

import { type IResponseOffers } from "@/services/offers/types"

import SharedPopupButton from "./SharedPopup"
import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { daysAgo, useResize } from "@/helpers"
import { cx } from "@/lib/cx"
import { dispatchPublicProfile } from "@/store"

import styles from "../styles/profile.module.scss"

export const ItemProfile = ({ offer }: { offer: IResponseOffers }) => {
  const { created, user } = offer ?? {}
  const { isTablet } = useResize()
  const { image, firstName, lastName, id: userId } = user ?? {}

  const name = `${firstName || "Имя"} ${lastName || "Фамилия"}`

  return (
    <div className={cx(styles.container, "relative w-full flex flex-row items-start gap-2.5 !px-5")}>
      <Link
        data-img
        className="w-10 h-10 rounded-[0.625rem] !p-5 bg-BG-first relative overflow-hidden block"
        // href={isTablet ? {} : { pathname: `/customer/${userId}` }}
        // onClick={() => {
        //   if (!isTablet) {
        //     dispatchPublicProfile(userId!)
        //   }
        // }}
        href={{ pathname: `/customer/${userId}` }}
        target="_blank"
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
          <h4>{name}</h4>
          <img src="/svg/verified-tick.svg" alt="verified" height={16} width={16} />
        </div>
        <time dateTime={String(created)} className="text-text-secondary font-normal">
          {daysAgo(created)}
        </time>
      </div>
      <SharedPopupButton offer={offer} />
    </div>
  )
}
