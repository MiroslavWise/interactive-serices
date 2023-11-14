"use client"

import Image from "next/image"

import { ButtonDefault } from "@/components/common/Buttons"

import styles from "./styles/style.module.scss"
import { useOut } from "@/helpers/hooks/useOut"
import { Button } from "@/components/common"

export const FooterAsideLeft = () => {
    const { out } = useOut()

    return (
        <footer className={styles.footer}>
            <Button
                label="Выйти"
                typeButton="regular-primary"
                prefixIcon={
                    <Image
                        src="/svg/log-out.svg"
                        alt="out"
                        width={16}
                        height={16}
                    />
                }
                onClick={out}
            />
            <section>
                <p>Нужна помощь?</p>
                <p>Пишите нам в телеграм:</p>
                <a href="https://t.me/sheira" target="_blank">
                    @sheira
                </a>
            </section>
        </footer>
    )
}
