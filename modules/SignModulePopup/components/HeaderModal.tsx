import { type FC } from "react"
import Image from "next/image"


import type { TTypeSign } from "../types"

import styles from "./styles/style.module.scss"

export const HeaderModal: FC<{ type: TTypeSign }> = ({ type }) => {

  return (
    <header className={styles.header}>
      {
        type === "SignIn"
          ? (
            <>
              <Image
                src="/logo/wordmark.svg"
                alt="sheira"
                width={140}
                height={37}
              />
              <section>
                <h3>Войдите в свой аккаунт</h3>
                <p>С возвращением! Пожалуйста, введите свои данные ниже.</p>
              </section>
            </>
          ) : null
      }
      {
        type === "SignUp"
          ? (
            <>
              <Image
                src="/logo/wordmark.svg"
                alt="sheira"
                width={140}
                height={37}
              />
              <section>
                <h3>Создать аккаунт</h3>
                <p>Зарегистрируйтесь в Sheira и размещайте свои предложения на карте</p>
              </section>
            </>
          ) : null
      }
    </header>
  )
}