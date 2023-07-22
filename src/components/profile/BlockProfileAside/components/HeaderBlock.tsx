import Image from "next/image"

import type { THeaderBlock } from "./types/types"

import { BlockOther } from "@/components/profile/MainInfo/components/BlockOther"
import { BadgeAchievements } from "@/components/common/Badge"

import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = ({ data }) => {

  return (
    <header className={styles.containerHeader}>
      <div className={styles.avatar}>
        <Image
          className={styles.photo}
          src="/mocks/elena.png"
          alt='profile'
          width={94}
          height={94}
        />
        {
          data?.verified
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
        <h4>{data?.profile?.firstName} {data?.profile?.lastName}</h4>
        <div className={styles.geo}>
          <Image
            src="/svg/geo-marker.svg"
            alt="geo"
            width={16}
            height={16}
          />
          <p>Inglewood, Maine</p>
        </div>
        <p>Joined on February 2017</p>
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