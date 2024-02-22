"use client"

import { isMobile } from "react-device-detect"

import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, MContainerAboutProfile } from "@/components/profile"

export default function MyProfilePage() {
  return (
    <>
      {typeof isMobile !== "undefined" && !isMobile ? <ContainerAboutMe /> : null}
      {isMobile && <MContainerAboutProfile />}
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </>
  )
}
