"use client"

import { memo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { GlassesBanner } from "@/components/common/Glasses"
import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { useVisibleAndTypeAuthModal } from "@/store/hooks"
import { useVisibleAbout } from "@/store/state/useVisibleAbout"

import styles from "../styles/banner.module.scss"

export const BannerIsNoAuth = memo(function $BannerIsNoAuth() {
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { dispatchVisibleAbout } = useVisibleAbout()

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
                />
            </header>
            <section data-content>
                <article>
                    <p data-description>
                        Зарегистрируйтесь в Шейре и добавляйте свои предложения
                        на карту.
                    </p>
                    <div data-buttons>
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
})
