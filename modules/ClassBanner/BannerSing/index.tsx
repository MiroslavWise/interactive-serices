import Image from "next/image";

import styles from './style.module.scss'
import { ButtonDefault, ButtonFill } from "components/Buttons";
import { BannerCoins } from "./components/BannerCoins";
import { TBannerSing } from "./types";

const BannerSing: TBannerSing = ({ handleSignUpOrSignIn }) => {

        return (
                <div className={styles.container}>
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
                </div>
        )
}

export default BannerSing