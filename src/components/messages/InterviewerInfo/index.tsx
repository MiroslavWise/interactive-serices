"use client"

import Image from "next/image"
import { useQuery } from "react-query"
import { useSearchParams, useRouter } from "next/navigation"
import dayjs from "dayjs"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { BadgeAchievements } from "@/components/common/Badge"
import { BlockOther } from "@/components/profile/MainInfo/components/BlockOther"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"
import { BADGES } from "@/mocks/components/auth/constants"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"

import styles from "./styles/style.module.scss"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"

export const InterviewerInfoCurrent = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("user")

  const { data, isLoading } = useQuery(["profile", id], () => profileService.getProfileThroughUserId(id!))

  const { res: profile } = data ?? {}

  function handleGoProfile() {
    push(`/user?id=${id}`)
  }

  return (
    <section className={styles.container}>
      <div className={styles.contentProfile}>
        <header className={stylesHeader.containerHeader}>
          <div className={stylesHeader.avatar}>
            {
              profile?.image?.attributes?.url
                ? (
                  <NextImageMotion
                    className={stylesHeader.photo}
                    src={profile?.image?.attributes?.url!}
                    alt="avatar"
                    width={94}
                    height={94}
                  />
                ) : (
                  <ImageStatic
                    src="/png/default_avatar.png"
                    alt="avatar"
                    width={94}
                    height={94}
                    classNames={[stylesHeader.photo]}
                  />
                )
            }
            {
              true
                ? (
                  <Image
                    className={stylesHeader.verified}
                    src="/svg/verified-tick.svg"
                    alt='tick'
                    width={32}
                    height={32}
                  />
                ) : null
            }
          </div>
          <section className={stylesHeader.title}>
            <h4>{profile?.firstName} {profile?.lastName}</h4>
            <GeoTagging size={16} fontSize={14} location="Арбат, Москва" />
            {profile?.created ? <p>Присоединился {dayjs(profile?.created!).format("DD.MM.YYYY")}</p> : null}
          </section>
          <BlockOther
            label="Достижения"
            classNames={[stylesHeader.achievements]}
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
        <ul className={styles.badges}>
          {
            BADGES.slice(1, 3).map(item => (
              <BadgeAchievements
                classNames={[styles.badge]}
                key={`${item.title}_is_auth_banner`}
                title={item.title}
                total={item.total}
                type={item.rating_movement}
              />
            ))
          }
        </ul>
      </div>
      <div className={styles.buttons}>
        <ButtonFill
          type="primary"
          label="Посмотреть профиль"
          handleClick={handleGoProfile}
        />
        <ButtonDefault
          type="primary"
          disabled
          label="Удалить чат"
        />
      </div>
    </section>
  )
}

export const InterviewerInfoEmpty = () => <section className={styles.container} />

export const InterviewerInfo = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("user")
  const { currentChatId } = useChat()

  return (currentChatId || id) ? <InterviewerInfoCurrent /> : <InterviewerInfoEmpty />
}