"use client"

import { IResponseOffers, IUserOffer } from "@/services/offers/types"

import { NextImageMotion } from "@/components/common"
import SharedPopupButton from "./SharedPopup"

import { daysAgo } from "@/helpers"

import styles from "../styles/profile.module.scss"

export const ItemProfile = ({ offer }: { offer: IResponseOffers }) => {
  const { created, user } = offer ?? {}
  const { image, firstName, lastName } = user ?? {}

  return (
    <div className={styles.container}>
      <div data-img>
        <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={44} height={44} />
      </div>
      <div data-info>
        <div data-name>
          <h4>
            {firstName || ""} {lastName || ""}
          </h4>
          <img src="/svg/verified-tick.svg" alt="verified" height={16} width={16} />
        </div>
        <time dateTime={String(created)}>{daysAgo(created)}</time>
      </div>
      <SharedPopupButton offer={offer} />
    </div>
  )
}
