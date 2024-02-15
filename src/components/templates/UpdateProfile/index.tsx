"use client"

import { useState } from "react"

import { PersonalData } from "./components/PersonalData"
import { LoginDetails } from "./components/LoginDetails"
import { ButtonClose, Segments } from "@/components/common"

import { cx } from "@/lib/cx"
import { SEGMENTS } from "./constants/segments"
import { useUpdateProfile, dispatchUpdateProfile } from "@/store"

import styles from "./styles/style.module.scss"

export const UpdateProfile = () => {
  const visible = useUpdateProfile(({ visible }) => visible)
  const [active, setActive] = useState(SEGMENTS[0])

  function close() {
    dispatchUpdateProfile(false)
  }

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visible}>
      <section data-section-modal>
        <ButtonClose onClick={close} />
        <header>
          <h3>Редактирование профиля</h3>
        </header>
        <article>
          <Segments VALUES={SEGMENTS} active={active} setActive={setActive} isBorder type="primary" />
        </article>
        {active.value === "personal-data" ? <PersonalData /> : active.value === "login-details" ? <LoginDetails /> : null}
      </section>
    </div>
  )
}
