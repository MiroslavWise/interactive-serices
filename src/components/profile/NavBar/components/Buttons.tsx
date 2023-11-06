"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import {
    useAuth,
    useVisibleBannerNewServices,
    useVisibleAndTypeAuthModal,
} from "@/store/hooks"
import { useAddress, useOutsideClickEvent, usePush } from "@/helpers"

import styles from "./styles/style.module.scss"
import { SpoilerNotAdress } from "./SpoilerNotAdress"
import { usePathname } from "next/navigation"

export const Buttons = () => {
    const pathname = usePathname()
    const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()
    const { isAddresses } = useAddress()
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { isAuth } = useAuth()
    const { handlePush } = usePush()
    const [active, setActive, ref] = useOutsideClickEvent()

    return !isMobile ? (
        isAuth ? (
            <div className={styles.buttons}>
                {pathname !== "/" ? (
                    <ButtonDefault
                        label="Просмотр карты"
                        handleClick={() => handlePush(`/`)}
                    />
                ) : null}
                <ButtonFill
                    type="primary"
                    label="Создать новое"
                    classNames={styles.widthButton}
                    ref={ref}
                    suffix={
                        <Image
                            src="/svg/plus.svg"
                            alt="plus"
                            width={24}
                            height={24}
                        />
                    }
                    handleClick={() => {
                        if (isAddresses) {
                            setIsVisibleNewServicesBanner(true)
                        } else {
                            setActive(true)
                        }
                    }}
                />
                <SpoilerNotAdress active={active} setActive={setActive} />
            </div>
        ) : (
            <div className={styles.buttons}>
                <ButtonFill
                    type="primary"
                    label="Войти"
                    classNames={styles.widthButton}
                    handleClick={() =>
                        setVisibleAndType({ visible: true, type: "SignIn" })
                    }
                />
                <ButtonDefault
                    label="Зарегистрироваться"
                    handleClick={() =>
                        setVisibleAndType({ visible: true, type: "SignUp" })
                    }
                />
            </div>
        )
    ) : null
}
