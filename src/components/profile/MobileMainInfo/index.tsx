import Image from "next/image"

import { TMobileMainInfo } from "./types"

import { NextImageMotion } from "@/components/common/Image"
import { MotionLI } from "@/components/common/Motion"

//todo
import { ACHIEVEMENTS } from "../MainInfo/constants"

import styles from "./styles.module.scss"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

export const MobileMainInfo: TMobileMainInfo = ({ name, photo, about }) => {

  return (
    <MotionLI classNames={[styles.containerMain]}>
      <div className={styles.blockAboutPhoto}>
        <div className={styles.blockPhotoAch}>
          <div className={styles.avatar}>
            <NextImageMotion
              className={styles.photo}
              src={photo ? photo : "/png/default_avatar.png"}
              alt="avatar"
              width={94}
              height={94}
            />
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
            location="Inglewood, Maine"
          />
          <p className={styles.date}>Joined on February 2017</p>
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
        />
        <ButtonCircleGradient
          type="primary"
          icon="/svg/repeat-primary.svg"
          size={20}
          classNames={styles.buttonCircle}
        />
      </div>
    </MotionLI>
  )
}