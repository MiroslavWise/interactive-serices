"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { isMobile, isTablet } from "react-device-detect"

import type { TSignBanner } from "./types"

import { Glasses } from "./components/Glasses"
import { BannerCoins } from "./components/BannerCoins"
import { BannerIsAuth } from "./components/BannerIsAuth"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useAuth, useVisibleAndTypeAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const SignBanner: TSignBanner = ({}) => {
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { isAuth } = useAuth()

    return !isMobile || isTablet ? (
        isAuth ? (
            <BannerIsAuth />
        ) : (
            <motion.ul
                id="SignBanner"
                className={cx(styles.container)}
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                exit={{ opacity: 0, visibility: "hidden" }}
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
                        <p className={styles.description}>
                            Зарегистрируйтесь в Шейре и добавляйте свои
                            предложения на карту.
                        </p>
                        <div className={styles.buttons}>
                            <ButtonFill
                                type="primary"
                                label="Войти"
                                classNames="w-100"
                                handleClick={() =>
                                    setVisibleAndType({
                                        visible: true,
                                        type: "SignIn",
                                    })
                                }
                            />
                            <ButtonDefault
                                label="Зарегистрироваться"
                                classNames="w-100"
                                handleClick={() =>
                                    setVisibleAndType({
                                        visible: true,
                                        type: "SignUp",
                                    })
                                }
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
            </motion.ul>
        )
    ) : null
}
