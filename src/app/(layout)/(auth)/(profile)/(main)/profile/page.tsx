"use client"

import { ContainerAboutMe, ContainerSuggestions, ContainerTagAndButton, MContainerAboutProfile } from "@/components/profile"

import { cx } from "@/lib/cx"

import main from "../layout.module.scss"

export default function MyProfilePage() {
  return (
    <ul className={cx(main.wrapperInsideContainer, main.default, "__container-profile-page__")}>
      <MContainerAboutProfile />
      <ContainerAboutMe />
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </ul>
  )
}
