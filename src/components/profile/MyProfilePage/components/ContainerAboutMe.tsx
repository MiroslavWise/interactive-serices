"use client"

import { useEffect, useRef, useState } from "react"

import type { IPostProfileData } from "@/services/profile/types"

import { useAuth } from "@/store"
import { serviceProfile } from "@/services"
import { useOut } from "@/helpers/hooks/useOut"

import styles from "./styles/style.module.scss"
import { BadgesColors } from "./BadgesColors"

export const ContainerAboutMe = () => {
  const { out } = useOut()
  const [isEditing, setIsEditing] = useState(false)
  const [textEditing, setTextEditing] = useState("")
  const user = useAuth(({ user }) => user)
  const userId = useAuth(({ userId }) => userId)
  const profileId = useAuth(({ profileId }) => profileId)
  const updateProfile = useAuth(({ updateProfile }) => updateProfile)

  const refTextArea = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing) {
      if (refTextArea.current) {
        refTextArea.current?.focus()
      }
    }
    return () => {}
  }, [isEditing])

  useEffect(() => {
    if (user?.about) {
      setTextEditing(user?.about)
    }
  }, [user?.about])

  function handleEditing() {
    if (isEditing) {
      const data: IPostProfileData = {
        about: textEditing,
        username: user?.username!,
        userId: Number(userId),
      }
      serviceProfile
        .patch(data, Number(profileId))
        .then((response) => {
          if (response.error?.code === 401) {
            out()
          }
        })
        .finally(() => {
          updateProfile()
          setIsEditing(false)
        })
    } else {
      setIsEditing(true)
    }
  }

  return (
    <section className={styles.containersAbout}>
      <div className={styles.about}>
        <h4>Обо мне</h4>
        {isEditing ? (
          <textarea ref={refTextArea} onChange={(value) => setTextEditing(value?.target?.value)} value={textEditing} />
        ) : user?.about ? (
          <p>{user?.about}</p>
        ) : (
          <a onClick={handleEditing}>Нажмите, что-бы редактировать информацию о себе</a>
        )}
        <div className={styles.buttonEditing} onClick={handleEditing}>
          <img src={isEditing ? "/svg/check-square-broken.svg" : "/svg/edit.svg"} alt="edit" width={16} height={16} />
        </div>
      </div>
      <BadgesColors userId={userId!} />
    </section>
  )
}
