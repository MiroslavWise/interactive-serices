"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/common"
import { GlassesBanner } from "@/components/common/Glasses"

import { useModalAuth, useVisibleAbout } from "@/store/hooks"

import styles from "../styles/banner.module.scss"

export const BannerIsNoAuth = () => {
    const dispatchAuthModal = useModalAuth(
        ({ dispatchAuthModal }) => dispatchAuthModal,
    )
    const dispatchVisibleAbout = useVisibleAbout(
        ({ dispatchVisibleAbout }) => dispatchVisibleAbout,
    )

    return (
        <motion.ul
            id="SignBanner"
            className={styles.containerNoAuth}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, visibility: "hidden" }}
        >
            <header>
                <Image
                    src="/logo/wordmark.svg"
                    alt="sheira"
                    width={140}
                    height={37}
                    unoptimized
                />
            </header>
            <section data-content>
                <article>
                    <p data-description>
                        Зарегистрируйтесь в Шейре и добавляйте свои предложения
                        на карту.
                    </p>
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
                        {/* <div className={styles.bannerContent}>
                            <BannerCoins />
                        </div> */}
                    </div>
                </article>
            </section>
            <footer onClick={() => dispatchVisibleAbout(true)}>
                <a>Всё о Шейре</a>
            </footer>
            <GlassesBanner />
        </motion.ul>
    )
}
