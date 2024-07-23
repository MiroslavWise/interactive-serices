"use client"

import Image from "next/image"

import { Button } from "@/components/common"

import { dispatchAuthModal, dispatchVisibleAbout } from "@/store"

import styles from "../styles/banner.module.scss"

export const BannerIsNoAuth = () => {
  return (
    <div id="SignBanner" className={styles.containerNoAuth}>
      <header>
        <Image src="/logo/wordmark.svg" alt="sheira" width={140} height={37} unoptimized />
      </header>
      <section data-content>
        <article>
          <p data-description>Зарегистрируйтесь в Шейре и добавляйте свои предложения на карту.</p>
          <div data-buttons>
            <Button
              type="button"
              typeButton="fill-primary"
              label="Войти"
              onClick={() => {
                dispatchAuthModal({
                  visible: true,
                  type: "SignIn",
                })
              }}
            />
            <Button
              type="button"
              typeButton="regular-primary"
              label="Зарегистрироваться"
              onClick={() => {
                dispatchAuthModal({
                  visible: true,
                  type: "SignUp",
                })
              }}
            />
          </div>
        </article>
      </section>
      <footer onClick={() => dispatchVisibleAbout(true)}>
        <a>Всё о Шейре</a>
      </footer>
    </div>
  )
}
