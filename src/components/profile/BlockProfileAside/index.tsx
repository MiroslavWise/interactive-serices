"use client"

import { type FC } from "react"
import { isMobile } from "react-device-detect"

import { HeaderBlock } from "./components/HeaderBlock"
import { Badges } from "./components/Badges"
import { ButtonDefault } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const BlockProfileAside: FC = () => {

  return (
    <section className={cx(styles.container, isMobile && styles.mobile)}>
      <HeaderBlock />
      {typeof isMobile !== "undefined" && !isMobile ? <Badges /> : null}
      <div className={styles.buttons}>
        {/* <ButtonDefault
          label="Редактировать профиль"
          classNames={cx("w-100", styles.largeButton)}
          disabled
        /> */}
      </div>
    </section>
  )
}