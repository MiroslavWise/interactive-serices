"use client"

import { useRouter } from "next/navigation"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { NewServicesBanner } from "@/components/profile/NewServicesBanner"

import { useAuth } from "@/store/hooks/useAuth"

import styles from "./styles/style.module.scss"
import Image from "next/image"

export const Buttons = () => {
  const { isAuth } = useAuth() ?? {}
  const { push } = useRouter()

  return (
    isAuth ? (
      <div className={styles.buttons}>
        <ButtonDefault
          label="Просмотр карты"
          handleClick={() => push(`/`)}
        />
        <ButtonFill
          type="primary"
          label="Создать новую"
          classNames={styles.widthButton}
          suffix={<Image src="/svg/plus.svg" alt="plus" width={24} height={24} />}
        />
      </div>
    ) : (
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
    )
  )
}