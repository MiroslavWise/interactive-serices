"use client"

import { isMobile } from "react-device-detect"

import { Button, ButtonLink } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"
import { AchievementsCount } from "../AchievementsCount"
import { ButtonFriends } from "./components/ButtonFriends"

import { useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BlockProfileAside = () => {
    const setVisible = useUpdateProfile(({ setVisible }) => setVisible)

    return (
        <section className={styles.container}>
            <HeaderBlock />
            {typeof isMobile !== "undefined" && !isMobile ? <AchievementsCount /> : null}
            <ButtonFriends />
            <div data-buttons>
                <ButtonLink
                    label="Редактировать профиль"
                    typeButton="regular-primary"
                    href={{
                        pathname: "/profile/change",
                    }}
                />
                {/* <Button label="Редактировать профиль" typeButton="regular-primary" onClick={() => setVisible(true)} /> */}
            </div>
        </section>
    )
}
