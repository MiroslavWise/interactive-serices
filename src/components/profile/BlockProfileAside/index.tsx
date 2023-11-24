"use client"

import { type FC } from "react"
import { isMobile } from "react-device-detect"

import { Button } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"
import { AchievementsCount } from "../AchievementsCount"
import { ButtonFriends } from "./components/ButtonFriends"

import { useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BlockProfileAside: FC = () => {
    const { setVisible } = useUpdateProfile()

    return (
        <section className={styles.container} data-mobile={isMobile}>
            <HeaderBlock />
            {typeof isMobile !== "undefined" && !isMobile ? (
                <AchievementsCount />
            ) : null}
            <ButtonFriends />
            <div data-buttons>
                <Button
                    label="Редактировать профиль"
                    typeButton="regular-primary"
                    className="w-100"
                    onClick={() => setVisible(true)}
                />
            </div>
        </section>
    )
}
