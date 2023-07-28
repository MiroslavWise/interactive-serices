"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import type { TSignBanner } from "./types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"
import { BannerCoins } from "./components/BannerCoins"
import { Glasses } from "./components/Glasses"

import { useAuth, useVisibleAndTypeAuthModal } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const SignBanner: TSignBanner = ({ }) => {
  const { setVisibleAndType } = useVisibleAndTypeAuthModal()
  const { isAuth, user } = useAuth()
  const { push } = useRouter()

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
                    className={cx(styles.photo, "cursor-pointer")}
                    src="/mocks/elena.png"
                    alt='profile'
                    width={94}
                    height={94}
                    onClick={() => push(`/profile`)}
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
            <ButtonFill
              label="Мой профиль"
              classNames="w-100"
              handleClick={() => push(`/profile`)}
            />
            <ButtonDefault
              label="Редактировать"
              classNames="w-100"
              handleClick={() => setVisibleAndType({ visible: true, type: "PersonalEntry" })}
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
                  handleClick={() => setVisibleAndType({ visible: true, type: "SignIn" })}
              />
              <ButtonDefault
                label="Зарегистрироваться"
                classNames="w-100"
                  handleClick={() => setVisibleAndType({ visible: true, type: "SignUp" })}
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