"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import type { TSignBanner } from "./types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { BannerCoins } from "./components/BannerCoins"
import { Glasses } from "./components/Glasses"

import { useAuth } from "@/store/hooks/useAuth"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

const SignBanner: TSignBanner = ({ handleSignUpOrSignIn }) => {
  const { isAuth, user, signOut } = useAuth()

  return (
    isAuth ? (
      <motion.div
        id="SignBanner"
        className={cx(styles.container)}
        initial={{ left: -300, opacity: 0, visibility: "hidden", }}
        animate={{ left: 24, opacity: 1, visibility: "visible", }}
        transition={{ duration: 0.5, }}
        exit={{ left: -300, opacity: 0, visibility: "hidden", }}
      >
        <div className={styles.content}>
          {
            user ? (
              <div className={styles.userWrapper}>
                <div className={styles.avatar}>
                  <Image
                    className={styles.photo}
                    src="/mocks/elena.png"
                    alt='profile'
                    width={94}
                    height={94}
                  />
                  {
                    user.enabled ? (
                      <Image
                        className={styles.verified}
                        src="/svg/verified-tick.svg"
                        alt='tick'
                        width={32}
                        height={32}
                      />
                    ) : null
                  }
                </div>
                <h3>{user?.firstName} {user?.lastName}</h3>
              </div>
            ) : null
          }
          <div className={styles.buttons}>
            <ButtonDefault
              label="Редактировать"
              classNames="w-100"
              handleClick={() => handleSignUpOrSignIn("PersonalEntry")}
            />
            <ButtonFill
              type="primary"
              label="Выйти"
              classNames="w-100"
              handleClick={signOut}
            />
          </div>
        </div>
        <Glasses />
      </motion.div>
    ) : (
      <motion.div
        id="SignBanner"
        className={cx(styles.container)}
        initial={{ left: -300, opacity: 0, visibility: "hidden", }}
        animate={{ left: 24, opacity: 1, visibility: "visible", }}
        transition={{ duration: 0.5, }}
        exit={{ left: -300, opacity: 0, visibility: "hidden", }}
      >
        <div className={styles.headerSign}>
          <Image
            src="/logo/wordmark.svg"
            alt="sheira"
            width={140}
            height={37}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.descriptionSign}>
            <p className={styles.description}>Зарегистрируйтесь в Шейре и добавляйте свои предложения на карту.</p>
            <div className={styles.buttons}>
              <ButtonFill
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
          </div>
        </div>
        <div className={styles.footer}>
          <a>Всё о Шейре</a>
        </div>
        <Glasses />
      </motion.div>
    )
  )
}

export default SignBanner