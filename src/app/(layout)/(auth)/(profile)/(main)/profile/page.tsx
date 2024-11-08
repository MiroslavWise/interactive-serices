"use client"

import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, MContainerAboutProfile } from "@/components/profile"

import { cx } from "@/lib/cx"
// import { useBanner } from "@/store"

import main from "../layout.module.scss"

export default function MyProfilePage() {
  // const visible = useBanner(({ visible }) => visible)

  return (
    <ul
      className={cx(
        main.wrapperInsideContainer,
        // visible ? main.banner :
        main.default,
        "__container-profile-page__",
      )}
    >
      <MContainerAboutProfile />
      <ContainerAboutMe />
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </ul>
  )
}
