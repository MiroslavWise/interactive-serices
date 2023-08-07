import Image from "next/image"

import type { TMainInfo } from "./types/types"

import { ButtonFill, ButtonsCircle } from "@/components/common/Buttons"
import { NextImageMotion } from "@/components/common/Image"
import { BlockOther } from "./components/BlockOther"

import { ACHIEVEMENTS, SOCIAL_MEDIA } from "./constants"
import { PEOPLES } from "@/mocks/components/profile/constants"

import styles from "./styles/style.module.scss"
import { GeoTagging } from "@/components/common/GeoTagging"

export const MainInfo: TMainInfo = ({ user }) => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <NextImageMotion
            className={styles.photo}
            src={user?.profile?.image?.attributes?.url ? user?.profile?.image?.attributes?.url : "/png/default_avatar.png"}
            alt="avatar"
            width={94}
            height={94}
          />
          {
            user?.verified
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
        <div className={styles.information}>
          <div className={styles.titleAndButtons}>
            <div className={styles.nameAndGeo}>
              <h3>{user?.profile?.firstName || "First"} {user?.profile?.lastName || "Last"}</h3>
              <GeoTagging location="Inglewood, Maine" />
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
          <div className={styles.descriptionAndOther}>
            <p className={styles.description}>{user?.profile?.about}</p>
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
                    width={36}
                    height={36}
                  />
                ))
              }
            </BlockOther>
            <BlockOther
              label="Социальные медиа"
              classNames={[styles.social]}
            >
              {
                SOCIAL_MEDIA.map(item => (
                  <Image
                    key={item.assignment}
                    src={item.src}
                    alt={item.assignment}
                    width={28}
                    height={28}
                    className="cursor-pointer"
                  />
                ))
              }
            </BlockOther>
            <BlockOther
              label="Круг общения"
              classNames={[styles.peoples]}
            >
              {
                PEOPLES.map(item => (
                  <div key={item.assignment} className={styles.people}>
                    <Image
                      className={styles.img}
                      src={item.src}
                      alt={item.assignment}
                      width={33}
                      height={33}
                    />
                  </div>
                ))
              }
              <div className={styles.more}>
                <p>12+</p>
              </div>
            </BlockOther>
          </div>
        </div>
        <div className={styles.statusActive}>
          <p>Active 1 day ago</p>
          <div className={styles.dividers} />
          <p>Joined on February 2017</p>
        </div>
      </div>
    </div>
  )
}