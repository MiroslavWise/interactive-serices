"use client"

import { Button, ButtonLink } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"

import { dispatchUpdateProfile } from "@/store"

import styles from "./styles/style.module.scss"

export const BlockProfileAside = () => {
  return (
    <section className={styles.container}>
      <HeaderBlock />
      <Button type="button" label="Редактировать профиль" typeButton="regular-primary" onClick={() => dispatchUpdateProfile(true)} />
    </section>
  )
}
