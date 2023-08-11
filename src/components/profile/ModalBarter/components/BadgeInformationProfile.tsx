"use client"

import Image from "next/image"

import { useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import { GeoTagging } from "@/components/common/GeoTagging"

export const BadgeInformationProfile = ({}) => {
  const {dataProfile} = useVisibleModalBarter()

  return (
    <div className={styles.containerBadgeInformationProfile}>
      <h4>Бартер с:</h4>
      <section>
        <div className={styles.avatar}>
          <Image
            src="/mocks/maria.png"
            alt="avatar"
            width={40}
            height={40}
          />
          <Image
            src="/svg/verified-tick.svg"
            alt="verified"
            height={16}
            width={16}
            className={styles.verified}
          />
        </div>
        <div className={styles.textInformation}>
          <h5>Jenny Wilson</h5>
          <GeoTagging
            location="Арбат, Москва"
            size={14}
            fontSize={12}
          />
        </div>
      </section>
    </div>
  )
}