import { type FC } from "react"
import Image from "next/image"


import type { TTypeSing } from "../types"

import styles from './style.module.scss'

export const HeaderModal: FC<{ type: TTypeSing }> = ({ type }) => {

        return (
                <header className={styles.header}>
                        {
                                type === "SingIn"
                                        ? (
                                                <>
                                                        <Image
                                                                src="/logo/wordmark.svg"
                                                                alt="sheira"
                                                                width={140}
                                                                height={37}
                                                        />
                                                        <section>
                                                                <h3>Войдите в свой аккаунт</h3>
                                                                <p>С возвращением! Пожалуйста, введите свои данные ниже.</p>
                                                        </section>
                                                </>
                                        ) : null
                        }
                        {
                                type === "SingUp"
                                        ? (
                                                <>
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
                                                </>
                                        ) : null
                        }
                </header>
        )
}