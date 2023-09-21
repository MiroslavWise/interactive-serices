"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"

import { GeoTagging } from "@/components/common/GeoTagging"
import { BadgeAchievements } from "@/components/common/Badge"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { BlockOther } from "@/components/profile/MainInfo/components/BlockOther"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"

import { useAuth } from "@/store/hooks"
import { serviceThreads } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { useThread } from "@/store/state/useThreads"
import { useMessages } from "@/store/state/useMessages"
import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const InterviewerInfoCurrent = () => {
    const searchParams = useSearchParams()
    const { userId } = useAuth()
    const idUser = searchParams?.get("user")
    const idThread = searchParams?.get("thread")
    const { handlePush, handleReplace } = usePush()
    const { data } = useMessages()

    const dataUser = useMemo(() => {
        if (idThread! && data) {
            return {
                name: data?.[idThread]?.name!,
                photo: data?.[idThread]?.photo!,
                created: data?.[idThread]?.created!,
                idUser: data?.[idThread]?.idUser!,
            }
        }
    }, [idThread, data])

    const { getThreads } = useThread((state) => ({
        getThreads: state.getThreads,
    }))

    function handleGoProfile() {
        handlePush(`/user?id=${idUser}`)
    }

    function handleDeleteChat() {
        serviceThreads.delete(Number(idThread)).then((response) => {
            console.log("--- response delete ---", response)
            getThreads(userId!)
            handleReplace("/messages")
        })
    }

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
                        {dataUser?.photo ? (
                            <NextImageMotion
                                className={stylesHeader.photo}
                                src={dataUser?.photo!}
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
                        )}
                        {true ? (
                            <Image
                                className={stylesHeader.verified}
                                src="/svg/verified-tick.svg"
                                alt="tick"
                                width={32}
                                height={32}
                            />
                        ) : null}
                    </div>
                    <section className={stylesHeader.title}>
                        <h4>{dataUser?.name!}</h4>
                        <GeoTagging
                            size={16}
                            fontSize={14}
                            location="Арбат, Москва"
                        />
                        {dataUser?.created! ? (
                            <p>
                                Присоединился{" "}
                                {dayjs(dataUser?.created!).format("DD.MM.YYYY")}
                            </p>
                        ) : null}
                    </section>
                    <BlockOther
                        label="Достижения"
                        classNames={[stylesHeader.achievements]}
                    >
                        {ACHIEVEMENTS.map((item) => (
                            <Image
                                key={item.assignment}
                                src={item.src}
                                alt={item.assignment}
                                width={25}
                                height={25}
                            />
                        ))}
                    </BlockOther>
                </header>
                <ul className={styles.badges}>
                    {BADGES.slice(1, 3).map((item) => (
                        <BadgeAchievements
                            classNames={[styles.badge]}
                            key={`${item.title}_is_auth_banner`}
                            title={item.title}
                            total={item.total}
                            type={item.rating_movement}
                        />
                    ))}
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
                    handleClick={handleDeleteChat}
                />
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
    const searchParams = useSearchParams()
    const idUser = searchParams?.get("user")
    const idThread = searchParams?.get("thread")

    return idUser && idThread ? (
        <InterviewerInfoCurrent />
    ) : (
        <InterviewerInfoEmpty />
    )
}
