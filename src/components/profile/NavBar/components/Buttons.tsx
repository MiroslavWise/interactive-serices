"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import {
    useAuth,
    useVisibleBannerNewServices,
    useModalAuth,
} from "@/store/hooks"
import { useAddress, useOutsideClickEvent, usePush } from "@/helpers"

import styles from "./styles/style.module.scss"
import { SpoilerNotAdress } from "./SpoilerNotAdress"
import { usePathname } from "next/navigation"
import { Button } from "@/components/common"

export const Buttons = () => {
    const pathname = usePathname()
    const { dispatchNewServicesBanner } = useVisibleBannerNewServices((_) => ({
        dispatchNewServicesBanner: _.dispatchNewServicesBanner,
    }))
    const { isAddresses } = useAddress()
    const { dispatchAuthModal } = useModalAuth((_) => ({
        dispatchAuthModal: _.dispatchAuthModal,
    }))
    const { is } = useAuth((_) => ({ is: _.isAuth }))
    const { handlePush } = usePush()
    const [active, setActive, ref] = useOutsideClickEvent()

    return !isMobile ? (
        typeof is !== "undefined" ? (
            is ? (
                <div className={styles.buttons}>
                    {pathname !== "/" ? (
                        <Button
                            label="Просмотр карты"
                            typeButton="regular-primary"
                            className={styles.widthButton}
                            onClick={() => handlePush(`/`)}
                        />
                    ) : null}
                    <Button
                        label="Создать новое"
                        typeButton="fill-primary"
                        className={styles.widthButton}
                        ref={ref}
                        suffixIcon={
                            <Image
                                src="/svg/plus.svg"
                                alt="plus"
                                width={24}
                                height={24}
                                unoptimized
                            />
                        }
                        onClick={() => {
                            if (isAddresses) {
                                dispatchNewServicesBanner(true)
                            } else {
                                setActive(true)
                            }
                        }}
                    />
                    <SpoilerNotAdress active={active} setActive={setActive} />
                </div>
            ) : (
                <div className={styles.buttons}>
                    <Button
                        label="Войти"
                        typeButton="fill-primary"
                        className={styles.widthButton}
                        onClick={() =>
                            dispatchAuthModal({ visible: true, type: "SignIn" })
                        }
                    />
                    <Button
                        label="Зарегистрироваться"
                        typeButton="regular-primary"
                        className={styles.widthButton}
                        onClick={() =>
                            dispatchAuthModal({ visible: true, type: "SignUp" })
                        }
                    />
                </div>
            )
        ) : (
            <div />
        )
    ) : null
}
