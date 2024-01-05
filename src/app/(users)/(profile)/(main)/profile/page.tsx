"use client"

import { isMobile } from "react-device-detect"

import { AchievementsCount } from "@/components/profile/AchievementsCount"
import { ButtonFriends } from "@/components/profile/BlockProfileAside/components/ButtonFriends"
import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, M_ContainerAboutProfile } from "@/components/profile"

export default function MyProfilePage({}) {
    return (
        <>
            {typeof isMobile !== "undefined" && !isMobile ? <ContainerAboutMe /> : null}
            {isMobile && <M_ContainerAboutProfile />}
            {isMobile && <ButtonFriends />}
            {isMobile && <AchievementsCount />}
            <ContainerTagAndButton />
            <ContainerSuggestions />
        </>
    )
}
