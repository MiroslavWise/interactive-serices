import { memo } from "react"

import { IResponseOffers } from "@/services/offers/types"
import type { IGetProfileIdResponse } from "@/services/profile/types"

import { NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"

import styles from "../styles/profile.module.scss"

export const ItemProfile = memo(function ItemProfile({ profile, offer }: { profile: IGetProfileIdResponse; offer: IResponseOffers }) {
  return (
    <div className={styles.container}>
      <div data-img>
        <NextImageMotion src={profile?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
      </div>
      <div data-info>
        <div data-name>
          <h4>
            {profile?.firstName || ""} {profile?.lastName || ""}
          </h4>
          <img src="/svg/verified-tick.svg" alt="verified" height={16} width={16} />
        </div>
        <time dateTime={String(offer.created)}>{daysAgo(offer.created)}</time>
      </div>
    </div>
  )
})
