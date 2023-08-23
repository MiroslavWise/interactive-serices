"use client"

import { isMobile } from "react-device-detect"

import type { TMyProfilePage } from "./types/types"

import { ContainerAboutMe } from "./components/ContainerAboutMe"
import { ContainerTagAndButton } from "./components/ContainerTagAndButton"
import { ContainerSuggestions } from "./components/ContainerSuggestions"
import { M_ContainerAboutProfile } from "./components/M_ContainerAboutProfile"
import { Badges } from "../BlockProfileAside/components/Badges"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const MyProfilePage: TMyProfilePage = ({ }) => {
  return (
    <ul className={cx(styles.containerProfilePage, isMobile && styles.mobile)}>
      {typeof isMobile !== "undefined" && !isMobile ? <ContainerAboutMe /> : null}
      {isMobile ? <M_ContainerAboutProfile /> : null}
      {isMobile ? <Badges /> : null}
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </ul>
  )
}