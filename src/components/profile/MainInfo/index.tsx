"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"

import type { TMainInfo } from "./types/types"
import type { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"

import { AddFriend } from "./components/AddFriend"
import { BlockOther } from "./components/BlockOther"
import { ComplaintButton } from "./components/ComplaintButton"
import { GeoTagging, NextImageMotion } from "@/components/common"
import { CircleOfCommunication } from "./components/CircleOfCommunication"

import { useAuth } from "@/store"
import { dayFormat } from "@/helpers"
import { SOCIAL_MEDIA } from "./constants"

import styles from "./styles/style.module.scss"

export const MainInfo: TMainInfo = ({ user }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const geo: IAddressesResponse | null = useMemo(() => {
    return user?.addresses?.find((item) => item?.addressType === "main") || null
  }, [user?.addresses])

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <NextImageMotion className={styles.photo} src={user?.profile?.image?.attributes?.url!} alt="avatar" width={94} height={94} />
        <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} />
      </div>
      <div className={styles.content}>
        <div className={styles.information}>
          <div className={styles.titleAndButtons}>
            <div className={styles.nameAndGeo}>
              <h3>
                {user?.profile?.firstName || "First"} {user?.profile?.lastName || "Last"}
              </h3>
              {geo ? <GeoTagging location={geo?.additional} /> : null}
            </div>
            {userId !== user?.id && userId ? (
              <section className={styles.buttons}>
                <AddFriend user={user} />
                <Link
                  data-circle-gradient
                  href={Number(userId) === Number(user?.id) || !userId ? {} : { pathname: "/messages", query: { user: user?.id } }}
                >
                  <img src="/svg/message-dots-circle-primary.svg" alt="message-dots-circle" width={20} height={20} />
                </Link>
              </section>
            ) : null}
          </div>
          <div className={styles.descriptionAndOther}>
            <p className={styles.description}>{user?.profile?.about}</p>
            <BlockOther label="Социальные медиа" classNames={[styles.social]}>
              {SOCIAL_MEDIA.map((item) => (
                <Image
                  key={item.assignment}
                  src={item.src}
                  alt={item.assignment}
                  width={28}
                  height={28}
                  className="cursor-pointer"
                  unoptimized
                />
              ))}
            </BlockOther>
            <CircleOfCommunication user={user} />
          </div>
        </div>
        <div className={styles.statusActive}>
          <ComplaintButton user={user!} />
          <div className={styles.dividers} />
          <p>{user?.created ? dayFormat(user?.created, "dd.MM.yyyy") : null}</p>
        </div>
      </div>
    </div>
  )
}
