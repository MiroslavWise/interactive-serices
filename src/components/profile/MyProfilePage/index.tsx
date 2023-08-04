"use client"

import { isMobile } from "react-device-detect"

import type { TMyProfilePage } from "./types/types"

import { ContainerAboutMe } from "./components/ContainerAboutMe"
import { ContainerTagAndButton } from "./components/ContainerTagAndButton"
import { ContainerSuggestions } from "./components/ContainerSuggestions"

import styles from "./styles/style.module.scss"

export const MyProfilePage: TMyProfilePage = ({ }) => {
  return (
    <section className={styles.containerProfilePage}>
      {typeof isMobile !== "undefined" && !isMobile ? <ContainerAboutMe /> : null}
      <ContainerTagAndButton />
      <ContainerSuggestions />
    </section>
  )
}