"use client"

import { isMobile } from "react-device-detect"

import {
    ContainerAboutMe,
    ContainerSuggestions,
    ContainerTagAndButton,
    M_ContainerAboutProfile,
} from "@/components/profile"
import { AchievementsCount } from "@/components/profile/AchievementsCount"
import { ButtonFriends } from "@/components/profile/BlockProfileAside/components/ButtonFriends"

import styles from "@/components/profile/MyProfilePage/styles/style.module.scss"

export default function MyProfilePage({}) {
    return (
        <ul className={styles.containerProfilePage}>
            {typeof isMobile !== "undefined" && !isMobile ? (
                <ContainerAboutMe />
            ) : null}
            {isMobile && <M_ContainerAboutProfile />}
            {isMobile && <ButtonFriends />}
            {isMobile && <AchievementsCount />}
            <ContainerTagAndButton />
            <ContainerSuggestions />
        </ul>
    )
}
