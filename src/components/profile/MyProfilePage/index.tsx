"use client"

import type { TMyProfilePage } from "./types/types"

import { ContainerAboutMe } from "./components/ContainerAboutMe"
import { ContainerTagAndButton } from "./components/ContainerTagAndButton"

import { useAuth } from "@/store/hooks/useAuth"

import styles from "./styles/style.module.scss"

export const MyProfilePage: TMyProfilePage = ({ }) => {
  const {userId, user} = useAuth() ?? {}

  return (
    <section className={styles.containerProfilePage}>
      <ContainerAboutMe text={user?.about!} />
      <ContainerTagAndButton />
    </section>
  )
}