import Image from "next/image";
import { motion } from "framer-motion";

import type { TBannerSing } from "./types";

import { ButtonDefault, ButtonFill } from "components/Buttons";
import { BannerCoins } from "./components/BannerCoins";

import styles from './style.module.scss'

const BannerSing: TBannerSing = ({ handleSignUpOrSignIn }) => {

        return (
                <motion.div
                        className={styles.container}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                >
                        <header className={styles.headerSing}>
                                <Image
                                        src="/logo/wordmark.svg"
                                        alt="sheira"
                                        width={140}
                                        height={37}
                                />
                        </header>
                        <main className={styles.content}>
                                <section className={styles.descriptionSing}>
                                        <p className={styles.description}>Зарегистрируйтесь в Шейре и добавляйте свои предложения на карту.</p>
                                        <div className={styles.buttons}>
                                                <ButtonFill
                                                        type="primary"
                                                        label="Войти"
                                                        classNames="w-100"
                                                        handleClick={() => handleSignUpOrSignIn('SingIn')}
                                                />
                                                <ButtonDefault
                                                        label="Зарегистрироваться"
                                                        classNames="w-100"
                                                        handleClick={() => handleSignUpOrSignIn('SingUp')}
                                                />
                                                <div className={styles.bannerContent}>
                                                        <BannerCoins />
                                                </div>
                                        </div>
                                </section>
                        </main>
                        <footer className={styles.footer}>
                                <a>Всё о Шейре</a>
                        </footer>

                        <div className={styles.glassShadowOne} />
                        <div className={styles.glassShadowTwo} />
                </motion.div>
        )
}

export default BannerSing