"use client"

import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, MContainerAboutProfile } from "@/components/profile"

import { useResize } from "@/helpers"

export const dynamic = "force-static"
export const dynamicParams = false

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
