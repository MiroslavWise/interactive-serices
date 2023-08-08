"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import type { IPostProfileData } from "@/services/profile/types/profileService"

import { NextImageMotion } from "@/components/common/Image"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

import { useAuth } from "@/store/hooks"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"
import { profileService } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const M_ContainerAboutProfile = () => {
  const { push } = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [textEditing, setTextEditing] = useState("")
  const textArea = useRef<HTMLTextAreaElement | null>(null)
  const { user, imageProfile, userId, profileId, signOut, changeAuth } = useAuth()

  useEffect(() => {
    if (isEdit) {
      requestAnimationFrame(() => { if (textArea?.current) textArea.current.focus() })
    }
    return () => { }
  }, [isEdit])

  useEffect(() => {
    if (user?.about) {
      setTextEditing(user?.about)
    }
  }, [user?.about])

  function handleEditOrSave() {
    if (isEdit) {
      const data: IPostProfileData = {
        about: textEditing,
        username: user?.username!,
        userId: Number(userId),
      }
      if (profileId) {
        profileService.patchProfile(data, Number(profileId))
          .then(response => {
            if (response.error?.code === 401) {
              signOut()
            }
          })
          .finally(() => {
            setIsEdit(false)
            changeAuth()
          })
      } else {
        profileService.postProfile(data)
        .then(response => {
          if (response.error?.code === 401) {
            signOut()
          }
        })
        .finally(() => {
          setIsEdit(false)
          changeAuth()
        })
      }
    } else {
      setIsEdit(true)
    }
  }

  return (
    <section className={styles.containerMAboutProfile}>
      <div className={styles.blockAboutPhoto}>
        <div className={styles.blockPhotoAch}>
          <div className={styles.avatar}>
            <NextImageMotion
              className={styles.photo}
              src={imageProfile?.attributes?.url ? imageProfile?.attributes?.url : "/png/default_avatar.png"}
              alt="avatar"
              width={94}
              height={94}
            />
            {
              user ? (
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
          <h4>{user?.firstName} {user?.lastName}</h4>
          <GeoTagging
            size={16}
            fontSize={12}
            location="Inglewood, Maine"
          />
          <p className={styles.date}>Joined on February 2017</p>
          {
            isEdit
              ? (
                <textarea
                  ref={textArea}
                  onChange={(value) => setTextEditing(value?.target?.value)}
                  value={textEditing}
                />
              ) : (
                <p className={styles.about}>{user?.about}</p>
              )
          }
        </div>
      </div>
      <div className={styles.buttons}>
        <ButtonFill
          label="Редактировать профиль"
          classNames={styles.buttonFill}
        />
        <ButtonCircleGradient
          type="primary"
          icon="/svg/edit-primary-gradient.svg"
          size={20}
          classNames={styles.buttonCircle}
          handleClick={handleEditOrSave}
        />
        <ButtonCircleGradient
          type="primary"
          icon="/svg/log-out-primary-gradient.svg"
          size={20}
          classNames={styles.buttonCircle}
          handleClick={() => {
            signOut()
            push("/")
          }}
        />
      </div>
    </section >
  )
}