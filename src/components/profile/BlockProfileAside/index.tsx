"use client"

import { Button } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"

import { dispatchModal, EModalData } from "@/store"

import styles from "./styles/style.module.scss"

export const BlockProfileAside = () => {
  return (
    <section className={styles.container}>
      <HeaderBlock />
      <Button
        type="button"
        label="Редактировать профиль"
        typeButton="regular-primary"
        onClick={() => dispatchModal(EModalData.UpdateProfile)}
      />
    </section>
  )
}
