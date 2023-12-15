"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { usePathname } from "next/navigation"

import { Button, ButtonLink } from "@/components/common"
import { useAuth, useVisibleBannerNewServices, dispatchAuthModal } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Buttons = () => {
    const pathname = usePathname()
    const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)
    const isAuth = useAuth(({ isAuth }) => isAuth)

    return !isMobile ? (
        typeof isAuth !== "undefined" ? (
            isAuth ? (
                <div className={styles.buttons}>
                    {pathname !== "/" ? <ButtonLink href={{ pathname: "/" }} label="Просмотр карты" typeButton="regular-primary" /> : null}
                    <Button
                        label="Создать новое"
                        typeButton="fill-primary"
                        className={styles.widthButton}
                        suffixIcon={<Image src="/svg/plus.svg" alt="plus" width={24} height={24} unoptimized />}
                        style={{ width: "100%" }}
                        onClick={() => {
                            dispatchNewServicesBanner(true)
                        }}
                    />
                </div>
            ) : (
                <div className={styles.buttons}>
                    <Button
                        label="Войти"
                        typeButton="fill-primary"
                        className={styles.widthButton}
                        onClick={() => dispatchAuthModal({ visible: true, type: "SignIn" })}
                    />
                    <Button
                        label="Зарегистрироваться"
                        typeButton="regular-primary"
                        className={styles.widthButton}
                        onClick={() => dispatchAuthModal({ visible: true, type: "SignUp" })}
                    />
                </div>
            )
        ) : (
            <div />
        )
    ) : null
}
