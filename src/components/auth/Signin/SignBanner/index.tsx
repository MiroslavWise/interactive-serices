"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import type { TSignBanner } from "./types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { BannerCoins } from "./components/BannerCoins"

import styles from "./sign-banner.module.scss"

const SignBanner: TSignBanner = ({ handleSignUpOrSignIn }) => {

  return (
    <motion.div
      data-cy="sign-banner"
      className={styles.container}
      initial={{ left: -100, opacity: 0, visibility: "hidden", }}
      animate={{ left: 40, opacity: 1, visibility: "visible", }}
      transition={{ duration: 0.5, }}
      exit={{ left: -100, opacity: 0, visibility: "hidden", }}
    >
      <div className={styles.headerSign}>
        <Image
          src="/logo/wordmark.svg"
          alt="sheira"
          width={140}
          height={37}
        />
      </div>
      <main className={styles.content}>
        <section className={styles.descriptionSign}>
          <p
            className={styles.description}
            data-cy="offer-for-registration"
          >Зарегистрируйтесь в Шейре и добавляйте свои предложения на карту.</p>
          <div className={styles.buttons}>
            <ButtonFill
              dataAttribute={{
                "data-cy": "button-enter",
              }}
              type="primary"
              label="Войти"
              classNames="w-100"
              handleClick={() => handleSignUpOrSignIn("SignIn")}
            />
            <ButtonDefault
              label="Зарегистрироваться"
              classNames="w-100"
              handleClick={() => handleSignUpOrSignIn("SignUp")}
            />
            <div className={styles.bannerContent}>
              <BannerCoins />
            </div>
          </div>
        </section>
      </main>
      <div className={styles.footer}>
        <a>Всё о Шейре</a>
      </div>
    </motion.div>
  )
}

export default SignBanner