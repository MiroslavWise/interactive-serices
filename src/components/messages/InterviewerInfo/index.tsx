"use client"

import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { GeoTagging } from "@/components/common/GeoTagging"
import { BadgeAchievements } from "@/components/common/Badge"
import { Button, ImageStatic, NextImageMotion } from "@/components/common"

import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { IPatchThreads } from "@/services/threads/types"
import { useAuth, useMessagesType } from "@/store/hooks"
import { useRefetchListChat } from "../hook/useRefetchListChat"
import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"

export const InterviewerInfoCurrent = () => {
    const idThread = useSearchParams().get("thread")
    const userId = useAuth(({ userId }) => userId)
    const type = useMessagesType(({ type }) => type)
    const { handleReplace } = usePush()
    const refresh = useRefetchListChat()

    const { data } = useQuery({
        queryFn: () => serviceThreads.getId(Number(idThread)),
        queryKey: ["threads", `user=${userId}`, `id=${idThread}`],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    const idUser: number | null = useMemo(() => {
        if (data?.res) {
            return Number(data?.res?.emitterId) === Number(userId) ? Number(data?.res?.receiverIds[0]) : Number(data?.res?.emitterId)
        }

        return null
    }, [data?.res, userId])

    const { data: dataUser } = useQuery({
        queryFn: () => serviceUsers.getId(Number(idUser)),
        queryKey: ["user", idUser],
        enabled: !!idUser,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

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
        return dataUser?.res?.addresses?.find((_) => _.addressType === "main")?.additional || null
    }, [dataUser])

    return (
        <section className={styles.container}>
            <div className={styles.contentProfile}>
                <header className={stylesHeader.containerHeader}>
                    <div className={stylesHeader.avatar}>
                        {dataUser?.res?.profile?.image?.attributes?.url ? (
                            <NextImageMotion
                                className={stylesHeader.photo}
                                src={dataUser?.res?.profile?.image?.attributes?.url!}
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
                            {dataUser?.res?.profile?.firstName || ""} {dataUser?.res?.profile?.lastName}
                        </h4>
                        {geo ? <GeoTagging size={16} fontSize={14} location={geo} /> : null}
                        {dataUser?.res?.profile?.created! ? (
                            <p>На Sheira с {dayjs(dataUser?.res?.profile?.created!).format("DD.MM.YYYY")}</p>
                        ) : null}
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
                    href={{
                        pathname: "/user",
                        query: { id: idUser },
                    }}
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
