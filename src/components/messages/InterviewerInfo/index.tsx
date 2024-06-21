"use client"

import { memo } from "react"
import { useSearchParams } from "next/navigation"

import { IPatchThreads } from "@/services/threads/types"

import { Button, NextImageMotion, ButtonLink } from "@/components/common"

import { useUserIdMessage } from "@/store"
import { usePush } from "@/helpers/hooks/usePush"
import { useCountMessagesNotReading } from "@/helpers"
import { deleteThread, patchThread } from "@/services"

import styles from "./styles/style.module.scss"
import stylesHeader from "@/components/profile/BlockProfileAside/styles/header.module.scss"

export const InterviewerInfoCurrent = memo(function () {
  const idThread = useSearchParams().get("thread")
  const { handleReplace } = usePush()
  const userData = useUserIdMessage(({ userData }) => userData)
  const { refetchCountMessages } = useCountMessagesNotReading()

  function handleDeleteChat() {
    const data: IPatchThreads = { enabled: false }
    deleteThread(Number(idThread)).then((response) => {
      refetchCountMessages().finally(() => {
        console.log("%c --- response delete ---", "color: #f00", response)
        handleReplace("/messages")
      })
    })
  }

  return (
    <section className={styles.container}>
      <div className={styles.contentProfile}>
        <header className={stylesHeader.containerHeader}>
          <div className={stylesHeader.avatar}>
            <NextImageMotion className={stylesHeader.photo} src={userData?.image?.attributes?.url!} alt="avatar" width={94} height={94} />
            {true ? <img className={stylesHeader.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} /> : null}
          </div>
          <section className={stylesHeader.title}>
            <h4>
              {userData?.firstName || ""} {userData?.lastName}
            </h4>
          </section>
        </header>
      </div>
      <div className={styles.buttons}>
        <ButtonLink typeButton="fill-primary" label="Посмотреть профиль" href={{ pathname: "/user", query: { id: userData!?.id! } }} />
        <Button type="button" typeButton="regular-primary" label="Удалить чат" onClick={handleDeleteChat} />
      </div>
    </section>
  )
})

export const InterviewerInfoEmpty = () => <section className={styles.container} />

export const InterviewerInfo = () => {
  const idThread = useSearchParams().get("thread")

  return idThread ? <InterviewerInfoCurrent /> : <InterviewerInfoEmpty />
}
