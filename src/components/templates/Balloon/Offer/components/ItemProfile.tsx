import dayjs from "dayjs"
import { memo } from "react"

import { IResponseOffers } from "@/services/offers/types"
import type { IGetProfileIdResponse } from "@/services/profile/types"

import { NextImageMotion } from "@/components/common"

import styles from "../styles/profile.module.scss"

export const ItemProfile = memo(function ItemProfile({ profile, offer }: { profile: IGetProfileIdResponse; offer: IResponseOffers }) {
  return (
    <article className={styles.container}>
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
        <time>{dayjs(offer.created).format("HH:mm DD.MM.YYYY")}</time>
      </div>
    </article>
  )
})
