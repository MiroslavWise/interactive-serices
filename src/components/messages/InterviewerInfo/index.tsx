"use client"

import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { GeoTagging } from "@/components/common/GeoTagging"
import { BadgeAchievements } from "@/components/common/Badge"
import { Button, ImageStatic, NextImageMotion } from "@/components/common"

import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { IPatchThreads } from "@/services/threads/types"
import { useMessagesType, useUserIdMessage } from "@/store/hooks"
import { useRefetchListChat } from "../hook/useRefetchListChat"
import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"

export const InterviewerInfoCurrent = () => {
    const idThread = useSearchParams().get("thread")
    const type = useMessagesType(({ type }) => type)
    const { handleReplace } = usePush()
    const refresh = useRefetchListChat()
    const userData = useUserIdMessage(({ userData }) => userData)

    function handleDeleteChat() {
        const data: IPatchThreads = { enabled: false }
        serviceThreads.patch(data, Number(idThread)).then((response) => {
            refresh(type).finally(() => {
                requestAnimationFrame(() => {
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
                        {userData?.profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                className={stylesHeader.photo}
                                src={userData?.profile?.image?.attributes?.url!}
                                alt="avatar"
                                width={94}
                                height={94}
                            />
                        ) : (
                            <ImageStatic src="/png/default_avatar.png" alt="avatar" width={94} height={94} className={stylesHeader.photo} />
                        )}
                        {true ? (
                            <Image
                                className={stylesHeader.verified}
                                src="/svg/verified-tick.svg"
                                alt="tick"
                                width={32}
                                height={32}
                                unoptimized
                            />
                        ) : null}
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
                        <BadgeAchievements
                            classNames={[styles.badge]}
                            key={`${item.title}_is_auth_banner`}
                            title={item.title}
                            total={item.total}
                        />
                    ))}
                </ul>
            </div>
            <div className={styles.buttons}>
                <Link
                    href={
                        userData!?.id!
                            ? {
                                  pathname: "/user",
                                  query: { id: userData!?.id! },
                              }
                            : {}
                    }
                >
                    <span>Посмотреть профиль</span>
                </Link>
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
