"use client"

import dayjs from "dayjs"
import { useMemo } from "react"
import { flushSync } from "react-dom"
import { useSearchParams } from "next/navigation"

import { IPatchThreads } from "@/services/threads/types"

import { BadgeAchievements } from "@/components/common/Badge"
import { Button, NextImageMotion, GeoTagging, ButtonLink } from "@/components/common"

import { serviceThreads } from "@/services"
import { useUserIdMessage } from "@/store"
import { usePush } from "@/helpers/hooks/usePush"
import { useCountMessagesNotReading } from "@/helpers"
import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"

export const InterviewerInfoCurrent = () => {
    const idThread = useSearchParams().get("thread")
    const { handleReplace } = usePush()
    const userData = useUserIdMessage(({ userData }) => userData)
    const { refetchCountMessages } = useCountMessagesNotReading()

    function handleDeleteChat() {
        const data: IPatchThreads = { enabled: false }
        serviceThreads.patch(data, Number(idThread)).then((response) => {
            refetchCountMessages().finally(() => {
                flushSync(() => {
                    console.log("%c --- response delete ---", "color: #f0f", response)
                    handleReplace("/messages")
                })
            })
        })
    }

    const geo: string | null = useMemo(() => {
        return userData?.addresses?.find((_) => _.addressType === "main")?.additional || null
    }, [userData])

    return (
        <section className={styles.container}>
            <div className={styles.contentProfile}>
                <header className={stylesHeader.containerHeader}>
                    <div className={stylesHeader.avatar}>
                        <NextImageMotion className={stylesHeader.photo} src={userData?.profile?.image?.attributes?.url!} alt="avatar" width={94} height={94} />
                        {true ? <img className={stylesHeader.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} /> : null}
                    </div>
                    <section className={stylesHeader.title}>
                        <h4>
                            {userData?.profile?.firstName || ""} {userData?.profile?.lastName}
                        </h4>
                        {geo ? <GeoTagging size={16} fontSize={14} location={geo} /> : null}
                        {userData?.profile?.created! ? <p>На Sheira с {dayjs(userData?.profile?.created!).format("DD.MM.YYYY")}</p> : null}
                    </section>
                </header>
                <ul className={styles.badges}>
                    {BADGES.slice(1, 3).map((item) => (
                        <BadgeAchievements classNames={[styles.badge]} key={`${item.title}_is_auth_banner`} title={item.title} total={item.total} />
                    ))}
                </ul>
            </div>
            <div className={styles.buttons}>
                <ButtonLink typeButton="fill-primary" label="Посмотреть профиль" href={{ pathname: "/user", query: { id: userData!?.id! } }} />
                <Button type="button" typeButton="regular-primary" label="Удалить чат" onClick={handleDeleteChat} />
            </div>
        </section>
    )
}

export const InterviewerInfoEmpty = () => <section className={styles.container} />

export const InterviewerInfo = () => {
    const idThread = useSearchParams()?.get("thread")

    return idThread ? <InterviewerInfoCurrent /> : <InterviewerInfoEmpty />
}
