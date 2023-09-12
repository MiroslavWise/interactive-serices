"use client"

import Image from "next/image"
import dayjs from "dayjs"
import { useQuery } from "react-query"
import { useSearchParams } from "next/navigation"

import { GeoTagging } from "@/components/common/GeoTagging"
import { BadgeAchievements } from "@/components/common/Badge"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { BlockOther } from "@/components/profile/MainInfo/components/BlockOther"
import stylesHeader from "@/components/profile/BlockProfileAside/components/styles/style.module.scss"

import { useAuth, useChat } from "@/store/hooks"
import { profileService } from "@/services/profile"
import { threadsService } from "@/services/threads"
import { usePush } from "@/helpers/hooks/usePush"
import { useThread } from "@/store/state/useThreads"
import { BADGES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const InterviewerInfoCurrent = () => {
    const searchParams = useSearchParams()
    const { userId } = useAuth()
    const id = searchParams.get("user")
    const idThread = searchParams.get("thread")
    const { handlePush, handleReplace } = usePush()

    const { data, isLoading } = useQuery(["profile", id], () =>
        profileService.getProfileThroughUserId(id!),
    )

    const { getThreads } = useThread((state) => ({
        getThreads: state.getThreads,
    }))

    const { res: profile } = data ?? {}

    function handleGoProfile() {
        handlePush(`/user?id=${id}`)
    }

    function handleDeleteChat() {
        threadsService.delete(Number(idThread)).then((response) => {
            console.log("--- response delete ---", response)
            getThreads(userId!)
            handleReplace("/messages")
        })
    }

    return (
        <section className={styles.container}>
            <div className={styles.contentProfile}>
                <header className={stylesHeader.containerHeader}>
                    <div className={stylesHeader.avatar}>
                        {profile?.image?.attributes?.url ? (
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
                        <h4>
                            {profile?.firstName} {profile?.lastName}
                        </h4>
                        <GeoTagging
                            size={16}
                            fontSize={14}
                            location="Арбат, Москва"
                        />
                        {profile?.created ? (
                            <p>
                                Присоединился{" "}
                                {dayjs(profile?.created!).format("DD.MM.YYYY")}
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
        </section>
    )
}

export const InterviewerInfoEmpty = () => (
    <section className={styles.container} />
)

export const InterviewerInfo = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("user")
    const { currentChatId } = useChat()

    return currentChatId || id ? (
        <InterviewerInfoCurrent />
    ) : (
        <InterviewerInfoEmpty />
    )
}
