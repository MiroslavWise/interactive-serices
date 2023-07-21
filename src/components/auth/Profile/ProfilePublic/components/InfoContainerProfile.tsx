"use client"

import Image from "next/image"

import type { TInfoContainerProfile } from "./types"

import { ButtonFill } from "@/components/common/Buttons"
import { ButtonsCircle } from "@/components/common/Buttons"

import { MOCK_ACHIEVEMENTS } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import { useRouter } from "next/navigation"

export const InfoContainerProfile: TInfoContainerProfile = ({ profile }) => {
  const {push} = useRouter()
  return (
    <section className={styles.infoContainerProfile}>
      <div className={styles.avatarAndAchievements}>
        <div className={styles.avatar} onClick={() => push(`/user/${profile.userId}`)}>
          <Image
            className={styles.photo}
            src={profile?.photo}
            alt='profile'
            width={94}
            height={94}
          />
          <Image
            className={styles.verified}
            src="/svg/verified-tick.svg"
            alt='tick'
            width={32}
            height={32}
          />
        </div>
        <ul className={styles.achievements}>
          {
            MOCK_ACHIEVEMENTS.map(item => (
              <Image
                src={item}
                alt={item}
                key={item}
                width={36}
                height={36}
              />
            ))
          }
        </ul>
      </div>
      <div className={styles.titleAndGeoAndDescription}>
        <div className={styles.nameGeoDescription}>
          <div className={styles.nameAndGeo}>
            <h2>{profile?.name}</h2>
            <div className={styles.geo}>
              <Image
                src="/svg/geo-marker.svg"
                alt='geo'
                width={20}
                height={20}
              />
              <p>{profile?.geo}</p>
            </div>
          </div>
          <p className={styles.description}>{profile?.about}</p>
        </div>
        <section className={styles.buttons}>
          <ButtonFill
            label="Добавить в друзья"
            small
            shadow
          />
          <ButtonsCircle
            src="/svg/message-dots-circle.svg"
            type="primary"
          />
          <ButtonsCircle
            src="/svg/repeat-01.svg"
            type="primary"
          />
        </section>
      </div>
    </section>
  )
}