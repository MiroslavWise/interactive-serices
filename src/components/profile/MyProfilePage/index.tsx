"use client"

import { isMobile } from "react-device-detect"

import type { TMyProfilePage } from "./types/types"

import { AchievementsCount } from "../AchievementsCount"
import { ContainerAboutMe } from "./components/ContainerAboutMe"
import { ContainerSuggestions } from "./components/ContainerSuggestions"
import { ButtonFriends } from "../BlockProfileAside/components/ButtonFriends"
import { ContainerTagAndButton } from "./components/ContainerTagAndButton"
import { M_ContainerAboutProfile } from "./components/M_ContainerAboutProfile"

import styles from "./styles/style.module.scss"

export const MyProfilePage: TMyProfilePage = ({}) => {
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
