import { memo } from "react"
import dynamic from "next/dynamic"

import { IUserResponse } from "@/services/users/types"
import { IResponseOffers } from "@/services/offers/types"

import { NextImageMotion } from "@/components/common"

import { daysAgo } from "@/helpers"

const SharedPopupButton = dynamic(() => import("./SharedPopup"), { ssr: false })

import styles from "../styles/profile.module.scss"

export const ItemProfile = memo(function ItemProfile({ user, offer }: { user: IUserResponse; offer: IResponseOffers }) {
  return (
    <div className={styles.container}>
      <div data-img>
        <NextImageMotion src={user?.profile?.image?.attributes?.url!} alt="avatar" width={44} height={44} />
      </div>
      <div data-info>
        <div data-name>
          <h4>
            {user?.profile?.firstName || ""} {user?.profile?.lastName || ""}
          </h4>
          <img src="/svg/verified-tick.svg" alt="verified" height={16} width={16} />
        </div>
        <time dateTime={String(offer.created)}>{daysAgo(offer.created)}</time>
      </div>
      <SharedPopupButton offer={offer} user={user!} />
    </div>
  )
})
