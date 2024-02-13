"use client"

import { ButtonLink } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"

import styles from "./styles/style.module.scss"

export const BlockProfileAside = () => {
  return (
    <section className={styles.container}>
      <HeaderBlock />
      <ButtonLink
        label="Редактировать профиль"
        typeButton="regular-primary"
        href={{
          pathname: "/profile-change",
        }}
      />
    </section>
  )
}
