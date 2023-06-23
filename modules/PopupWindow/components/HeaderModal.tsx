import { type FC } from "react"




import styles from './style.module.scss'
import Image from "next/image"

export const HeaderModal: FC = () => {

        return (
                <header className={styles.header}>
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
                </header>
        )
}