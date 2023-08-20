"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { TMobileMainInfo } from "./types"

import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { MotionLI } from "@/components/common/Motion"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

import { useVisibleModalBarter } from "@/store/hooks"
import { ACHIEVEMENTS } from "../MainInfo/constants"

import styles from "./styles.module.scss"

export const MobileMainInfo: TMobileMainInfo = ({ name, photo, about, userId }) => {
  const { push } = useRouter()
  const { setIsVisibleBarter } = useVisibleModalBarter()

  // onClick={() => push(`/messages?user=${profile.userId}`, undefined)}
  // onClick={() => setIsVisibleBarter({ isVisible: true, dataProfile: { photo: profile?.photo, fullName: profile?.name } })}

  return (
    <MotionLI classNames={[styles.containerMain]}>
      <div className={styles.blockAboutPhoto}>
        <div className={styles.blockPhotoAch}>
          <div className={styles.avatar}>
            {
              photo
                ? (
                  <NextImageMotion
                    className={styles.photo}
                    src={photo}
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
            {
              photo ? (
                <Image
                  className={styles.verified}
                  src="/svg/verified-tick.svg"
                  alt='tick'
                  width={24}
                  height={24}
                />
              ) : null
            }
          </div>
          <ul className={styles.blockAchievements}>
            {
              ACHIEVEMENTS.map(item => (
                <li key={item.assignment + item.src}>
                  <Image
                    src={item.src}
                    alt={item.assignment}
                    width={23}
                    height={23}
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <div className={styles.aboutBlock}>
          <h4>{name}</h4>
          <GeoTagging
            size={16}
            fontSize={12}
            location="Арбат, Москва"
          />
          <p className={styles.date}>Присоединился в феврале 2017</p>
          <p className={styles.about}>{about}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <ButtonFill
          label="Добавить в друзья"
          type="primary"
          classNames={styles.buttonFill}
        />
        <ButtonCircleGradient
          type="primary"
          icon="/svg/message-dots-circle-primary.svg"
          size={20}
          classNames={styles.buttonCircle}
          handleClick={() => push(`/messages?user=${userId}`, undefined)}
        />
        <ButtonCircleGradient
          type="primary"
          icon="/svg/repeat-primary.svg"
          size={20}
          classNames={styles.buttonCircle}
          handleClick={() => setIsVisibleBarter({ isVisible: true, dataProfile: { photo: photo, fullName: name } })}
        />
      </div>
    </MotionLI>
  )
}