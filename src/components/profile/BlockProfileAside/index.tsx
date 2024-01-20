"use client"

import { isMobile } from "react-device-detect"

import { ButtonLink } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"
import { AchievementsCount } from "../AchievementsCount"
import { ButtonFriends } from "./components/ButtonFriends"

import styles from "./styles/style.module.scss"

export const BlockProfileAside = () => {
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
                        pathname: "/profile-change",
                    }}
                />
            </div>
        </section>
    )
}
