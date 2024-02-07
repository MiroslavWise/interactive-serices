"use client"

import { isMobile } from "react-device-detect"

import { ButtonFriends } from "@/components/profile/BlockProfileAside/components/ButtonFriends"
import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, M_ContainerAboutProfile } from "@/components/profile"
import { BadgesColors } from "@/components/profile/MyProfilePage/components/BadgesColors"
import { useAuth } from "@/store"

export default function MyProfilePage() {
  const userId = useAuth(({ userId }) => userId)

  return (
    <>
      {typeof isMobile !== "undefined" && !isMobile ? <ContainerAboutMe /> : null}
      {isMobile && <M_ContainerAboutProfile />}
      {isMobile && <ButtonFriends />}
      {isMobile && <BadgesColors userId={userId!} />}
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </>
  )
}
