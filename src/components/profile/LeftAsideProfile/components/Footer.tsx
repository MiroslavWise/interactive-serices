"use client"

import { Button } from "@/components/common"

import { dispatchOnboarding } from "@/store"
import { useOut } from "@/helpers/hooks/useOut"

import styles from "./styles/style.module.scss"

export const FooterAsideLeft = () => {
    const { out } = useOut()

    function handleOpen() {
        dispatchOnboarding("open")
    }

    return (
        <footer className={styles.footer}>
            <Button
                type="button"
                label="Выйти"
                typeButton="regular-primary"
                prefixIcon={<img src="/svg/log-out.svg" alt="out" width={16} height={16} />}
                onClick={out}
            />
            <section>
                <p data-onboarding onClick={handleOpen}>
                    Нужна помощь?
                </p>
                {/* <p>Пишите нам в телеграм:</p>
                <a href="https://t.me/sheira" target="_blank">
                    @sheira
                </a> */}
            </section>
        </footer>
    )
}
