"use client"

import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, MContainerAboutProfile } from "@/components/profile"

import { useResize } from "@/helpers"

export default function MyProfilePage() {
  const { isTablet } = useResize()

  return (
    <>
      {!isTablet ? <ContainerAboutMe /> : null}
      {isTablet && <MContainerAboutProfile />}
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </>
  )
}
