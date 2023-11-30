"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { GeoTagging } from "@/components/common/GeoTagging"
import { BadgeAchievements } from "@/components/common/Badge"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { serviceUsers } from "@/services/users"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { IPatchThreads } from "@/services/threads/types"
import { useAuth, useMessagesType } from "@/store/hooks"
import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"
import { useRefetchListChat } from "../hook/useRefetchListChat"

export const InterviewerInfoCurrent = () => {
    const idThread = useSearchParams()?.get("thread")
    const userId = useAuth(({ userId }) => userId)
    const type = useMessagesType(({ type }) => type)
    const { handlePush, handleReplace } = usePush()
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

    function handleGoProfile() {
        handlePush(`/user?id=${idUser}`)
    }

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
        <motion.section
            className={styles.container}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            exit={{ opacity: 0, visibility: "hidden" }}
        >
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
                            <p>Присоединился {dayjs(dataUser?.res?.profile?.created!).format("DD.MM.YYYY")}</p>
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
                <ButtonFill type="primary" label="Посмотреть профиль" handleClick={handleGoProfile} />
                <ButtonDefault type="primary" disabled label="Удалить чат" handleClick={handleDeleteChat} />
            </div>
        </motion.section>
    )
}

export const InterviewerInfoEmpty = () => (
    <motion.section
        className={styles.container}
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={{ opacity: 1, visibility: "visible" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        exit={{ opacity: 0, visibility: "hidden" }}
    />
)

export const InterviewerInfo = () => {
    const idThread = useSearchParams()?.get("thread")

    return idThread ? <InterviewerInfoCurrent /> : <InterviewerInfoEmpty />
}
