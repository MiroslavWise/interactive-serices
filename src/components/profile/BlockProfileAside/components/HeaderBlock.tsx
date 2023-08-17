import Image from "next/image"
import dayjs from "dayjs"

import type { THeaderBlock } from "./types/types"

import { BlockOther } from "@/components/profile/MainInfo/components/BlockOther"
import { GeoTagging } from "@/components/common/GeoTagging"
import { NextImageMotion } from "@/components/common/Image"

import { useAuth } from "@/store/hooks"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = () => {
  const { user, imageProfile, createdUser } = useAuth()

  console.log("user: ", user)

  return (
    <header className={styles.containerHeader}>
      <div className={styles.avatar}>
        <NextImageMotion
          className={styles.photo}
          src={imageProfile?.attributes?.url! ? imageProfile?.attributes?.url! : "/png/default_avatar.png"}
          alt="avatar"
          width={94}
          height={94}
        />
        {
          true
            ? (
              <Image
                className={styles.verified}
                src="/svg/verified-tick.svg"
                alt='tick'
                width={32}
                height={32}
              />
            ) : null
        }
      </div>
      <section className={styles.title}>
        <h4>{user?.firstName} {user?.lastName}</h4>
        <GeoTagging size={16} fontSize={14} location="Арбат, Москва" />
        {createdUser ? <p>Присоединился {dayjs(createdUser!).format("DD.MM.YYYY")}</p> : null}
      </section>
      <BlockOther
        label="Достижения"
        classNames={[styles.achievements]}
      >
        {
          ACHIEVEMENTS.map(item => (
            <Image
              key={item.assignment}
              src={item.src}
              alt={item.assignment}
              width={25}
              height={25}
            />
          ))
        }
      </BlockOther>
    </header>
  )
}