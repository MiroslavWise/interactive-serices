"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"

import type { TMobileMainInfo } from "./types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { AddFriend } from "../MainInfo/components/AddFriend"
import { NextImageMotion, GeoTagging } from "@/components/common"

import { useAuth } from "@/store"
import { dayFormat } from "@/helpers"

import styles from "./styles.module.scss"

export const MobileMainInfo: TMobileMainInfo = ({ user }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const geo: IAddressesResponse | null = useMemo(() => {
    return user?.addresses?.find((item) => item?.addressType === "main") || null
  }, [user?.addresses])

  return (
    <li className={styles.containerMain}>
      <div className={styles.blockAboutPhoto}>
        <div className={styles.blockPhotoAch}>
          <div className={styles.avatar}>
            <NextImageMotion className={styles.photo} src={user?.profile?.image?.attributes?.url} alt="avatar" width={94} height={94} />
            {user?.profile?.image?.attributes?.url ? (
              <Image className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={24} height={24} unoptimized />
            ) : null}
          </div>
        </div>
        <div className={styles.aboutBlock}>
          <h4>
            {user?.profile?.firstName || "____"} {user?.profile?.lastName || "----"}
          </h4>
          {geo ? <GeoTagging size={16} fontSize={12} location={geo?.additional} /> : null}
          <p data-start className={styles.date}>
            На Sheira с {user?.created ? dayFormat(user?.profile?.created, "dd.MM.yyyy") : null}
          </p>
          {user?.profile?.about ? <p className={styles.about}>{user?.profile?.about}</p> : null}
        </div>
      </div>
      {userId !== user?.id && !!userId ? (
        <div className={styles.buttons}>
          <AddFriend user={user} />
          <Link data-circle-gradient href={Number(userId) === Number(user?.id) ? {} : { pathname: `/messages`, query: { user: user?.id } }}>
            <img src="/svg/message-dots-circle-primary.svg" alt="message-dots-circle" width={20} height={20} />
          </Link>
        </div>
      ) : null}
    </li>
  )
}
