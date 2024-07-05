"use client"

import Link from "next/link"

import { type IResponseOffers } from "@/services/offers/types"

import SharedPopupButton from "./SharedPopup"
import { NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"

import styles from "../styles/profile.module.scss"

export const ItemProfile = ({ offer }: { offer: IResponseOffers }) => {
  const { created, user } = offer ?? {}
  const { image, firstName, lastName, id: userId } = user ?? {}

  return (
    <div className={styles.container}>
      <Link data-img href={{ pathname: `/customer/${userId}` }}>
        <NextImageMotion src={image?.attributes?.url!} alt="avatar" width={44} height={44} />
      </Link>
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
