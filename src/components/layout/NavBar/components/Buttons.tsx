"use client"

import { usePathname } from "next/navigation"

import { Button, ButtonLink } from "@/components/common"
import { useAuth, useVisibleBannerNewServices, dispatchAuthModal } from "@/store/hooks"

import styles from "../styles/components.module.scss"

export const Buttons = () => {
    const pathname = usePathname()
    const isAuth = useAuth(({ isAuth }) => isAuth)
    const dispatchNewServicesBanner = useVisibleBannerNewServices(({ dispatchNewServicesBanner }) => dispatchNewServicesBanner)

    return typeof isAuth !== "undefined" ? (
        isAuth ? (
            <div className={styles.buttons}>
                {pathname !== "/" ? <ButtonLink href={{ pathname: "/" }} label="Просмотр карты" typeButton="regular-primary" /> : null}
                <Button
                    label="Создать"
                    typeButton="fill-primary"
                    className={styles.widthButton}
                    suffixIcon={<img src="/svg/plus.svg" alt="plus" width={24} height={24} />}
                    style={{ width: "100%" }}
                    onClick={() => dispatchNewServicesBanner(true)}
                    id="nav-bar-button-create"
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
}
