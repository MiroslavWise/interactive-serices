import Image from "next/image"

import type { TMainInfo } from "./types/types"

import { ButtonFill, ButtonsCircle } from "@/components/common/Buttons"
import { BlockOther } from "./components/BlockOther"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { ACHIEVEMENTS, SOCIAL_MEDIA } from "./constants"
import { PEOPLES } from "@/mocks/components/profile/constants"

import styles from "./styles/style.module.scss"
import dayjs from "dayjs"

export const MainInfo: TMainInfo = ({ profile }) => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          {
            profile?.image?.attributes?.url
              ? (
                <NextImageMotion
                  className={styles.photo}
                  src={profile?.image?.attributes?.url!}
                  alt="avatar"
                  width={94}
                  height={94}
                />
              ) : (
                <ImageStatic
                  classNames={[styles.photo]}
                  src="/png/default_avatar.png"
                  alt="avatar"
                  width={94}
                  height={94}
                />
              )
          }
          {/* {
            verified
              ? (
                <Image
                  className={styles.verified}
                  src="/svg/verified-tick.svg"
                  alt='tick'
                  width={32}
                  height={32}
                />
              ) : null
          } */}
        </div>
        <div className={styles.information}>
          <div className={styles.titleAndButtons}>
            <div className={styles.nameAndGeo}>
              <h3>{profile?.firstName || "First"} {profile?.lastName || "Last"}</h3>
              <GeoTagging location="Арбат, Москва" />
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
            <p className={styles.description}>{profile?.about}</p>
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
                    <ImageStatic
                      src={item.src}
                      alt={item.assignment}
                      width={33}
                      height={33}
                      classNames={[styles.img]}
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
          <p>Активно 1 день назад</p>
          <div className={styles.dividers} />
          <p>Присоединился {profile.created ? dayjs(profile.created).format("DD.MM.YYYY") : null}</p>
        </div>
      </div>
    </div>
  )
}