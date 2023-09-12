"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import type { TContainerAboutMe } from "./types/types"
import type { IPostProfileData } from "@/services/profile/types/profileService"

import { profileService } from "@/services/profile"
import { useAuth } from "@/store/hooks/useAuth"
import { useOut } from "@/helpers/hooks/useOut"

import styles from "./styles/style.module.scss"

export const ContainerAboutMe: TContainerAboutMe = ({}) => {
    const { out } = useOut()
    const [isEditing, setIsEditing] = useState(false)
    const [textEditing, setTextEditing] = useState("")
    const { userId, profileId, user, changeAuth } = useAuth()

    useEffect(() => {
        const textArea = document?.getElementById("textArea")!
        if (isEditing) {
            textArea?.focus()
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
            profileService
                .patchProfile(data, Number(profileId))
                .then((response) => {
                    if (response.error?.code === 401) {
                        out()
                    }
                })
                .finally(() => {
                    setIsEditing(false)
                    changeAuth()
                })
        } else {
            setIsEditing(true)
        }
    }

    return (
        <div className={styles.containerAboutMe}>
            <h4>Обо мне</h4>
            {isEditing ? (
                <textarea
                    id="textArea"
                    onChange={(value) => setTextEditing(value?.target?.value)}
                    value={textEditing}
                />
            ) : user?.about ? (
                <p>{user?.about}</p>
            ) : (
                <a onClick={handleEditing}>
                    Нажмите, что-бы редактировать информацию о себе
                </a>
            )}
            <div className={styles.buttonEditing} onClick={handleEditing}>
                <Image
                    src={
                        isEditing
                            ? "/svg/check-square-broken.svg"
                            : "/svg/edit.svg"
                    }
                    alt="edit"
                    width={16}
                    height={16}
                />
            </div>
        </div>
    )
}
