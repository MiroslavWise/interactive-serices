import { memo } from "react"

import type { IGetProfileIdResponse } from "@/services/profile/types"

import { NextImageMotion } from "@/components/common"

import { useBalloonOffer } from "@/store"

import styles from "../styles/profile.module.scss"

export const ItemProfile = memo(function ItemProfile({ profile }: { profile: IGetProfileIdResponse }) {
  const offer = useBalloonOffer(({ offer }) => offer)

  const geo = offer?.addresses[0]

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
        {geo ? <p data-geo>{geo?.additional}</p> : null}
      </div>
    </article>
  )
})
