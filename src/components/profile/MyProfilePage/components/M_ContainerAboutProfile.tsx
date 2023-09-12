"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

import type { IPostProfileData } from "@/services/profile/types/profileService"

import { GeoTagging } from "@/components/common/GeoTagging"
import { ACHIEVEMENTS } from "@/components/profile/MainInfo/constants"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"
import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

import { profileService } from "@/services/profile"
import { useOut } from "@/helpers/hooks/useOut"
import { useAuth, useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const M_ContainerAboutProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [textEditing, setTextEditing] = useState("")
    const { setVisible } = useUpdateProfile()
    const textArea = useRef<HTMLTextAreaElement | null>(null)
    const { out } = useOut()
    const { user, imageProfile, userId, profileId, changeAuth, createdUser } =
        useAuth()

    useEffect(() => {
        if (isEdit) {
            requestAnimationFrame(() => {
                if (textArea?.current) textArea.current.focus()
            })
        }
        return () => {}
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
                profileService
                    .patchProfile(data, Number(profileId))
                    .then((response) => {
                        if (response.error?.code === 401) {
                            out()
                        }
                    })
                    .finally(() => {
                        setIsEdit(false)
                        changeAuth()
                    })
            } else {
                profileService
                    .postProfile(data)
                    .then((response) => {
                        if (response.error?.code === 401) {
                            out()
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
                        {imageProfile?.attributes?.url ? (
                            <NextImageMotion
                                className={styles.photo}
                                src={imageProfile?.attributes?.url}
                                alt="avatar"
                                width={94}
                                height={94}
                            />
                        ) : (
                            <ImageStatic
                                src="/png/default_avatar.png"
                                alt="avatar"
                                width={400}
                                height={400}
                                classNames={[styles.photo]}
                            />
                        )}
                        {user ? (
                            <Image
                                className={styles.verified}
                                src="/svg/verified-tick.svg"
                                alt="tick"
                                width={24}
                                height={24}
                            />
                        ) : null}
                    </div>
                    <ul className={styles.blockAchievements}>
                        {ACHIEVEMENTS.map((item) => (
                            <li key={item.assignment + item.src}>
                                <Image
                                    src={item.src}
                                    alt={item.assignment}
                                    width={23}
                                    height={23}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.aboutBlock}>
                    <h4>
                        {user?.firstName} {user?.lastName}
                    </h4>
                    <GeoTagging
                        size={16}
                        fontSize={12}
                        location="Арбат, Москва"
                    />
                    <p className={styles.date}>
                        Присоединился{" "}
                        {createdUser
                            ? dayjs(createdUser).format("DD.MM.YYYY")
                            : null}
                    </p>
                    {isEdit ? (
                        <textarea
                            ref={textArea}
                            onChange={(value) =>
                                setTextEditing(value?.target?.value)
                            }
                            value={textEditing}
                        />
                    ) : user?.about ? (
                        <p className={styles.about}>{user?.about}</p>
                    ) : (
                        <a onClick={handleEditOrSave}>
                            Нажмите, что-бы редактировать информацию о себе
                        </a>
                    )}
                </div>
            </div>
            <div className={styles.buttons}>
                <ButtonFill
                    label="Редактировать профиль"
                    classNames={styles.buttonFill}
                    handleClick={() => {
                        setVisible(true)
                    }}
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
                    handleClick={out}
                />
            </div>
        </section>
    )
}
