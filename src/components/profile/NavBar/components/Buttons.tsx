"use client"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useAuth } from "@/store/hooks/useAuth"

import styles from "./styles/style.module.scss"

export const Buttons = () => {
  const { isAuth } = useAuth() ?? {}

  return (
    !isAuth ? (
      <div className={styles.buttons}>
        <ButtonFill
          type="primary"
          label="Войти"
          classNames={styles.widthButton}
        />
        <ButtonDefault
          label="Зарегистрироваться"
        />
      </div>
    ) : null
  )
}