import type { TMyProfilePage } from "./types/types"

import { ContainerAboutMe } from "./components/ContainerAboutMe"
import { ContainerTagAndButton } from "./components/ContainerTagAndButton"

import styles from "./styles/style.module.scss"

export const MyProfilePage: TMyProfilePage = ({ }) => {

  return (
    <section className={styles.containerProfilePage}>
      <ContainerAboutMe />
      <ContainerTagAndButton />
    </section>
  )
}