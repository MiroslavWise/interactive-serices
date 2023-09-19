"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import {
    useAuth,
    useVisibleBannerNewServices,
    useVisibleAndTypeAuthModal,
    useVisibleNewServiceBarterRequests,
} from "@/store/hooks"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./styles/style.module.scss"

export const Buttons = () => {
    const { setIsVisibleNewServicesBanner } = useVisibleBannerNewServices()
    const { setIsVisibleNewServiceBarterRequests } =
        useVisibleNewServiceBarterRequests()
    const { setVisibleAndType } = useVisibleAndTypeAuthModal()
    const { isAuth } = useAuth()
    const { handlePush } = usePush()

    return !isMobile ? (
        isAuth ? (
            <div className={styles.buttons}>
                <ButtonDefault
                    label="Просмотр карты"
                    handleClick={() => handlePush(`/`)}
                />
                <ButtonFill
                    type="primary"
                    label="Создать новую"
                    classNames={styles.widthButton}
                    suffix={
                        <Image
                            src="/svg/plus.svg"
                            alt="plus"
                            width={24}
                            height={24}
                        />
                    }
                    handleClick={() => setIsVisibleNewServicesBanner(true)}
                />
                <ButtonFill
                    type="primary"
                    label="Запрос или услуга"
                    classNames={styles.widthButton}
                    suffix={
                        <Image
                            src="/svg/plus.svg"
                            alt="plus"
                            width={24}
                            height={24}
                        />
                    }
                    handleClick={() =>
                        setIsVisibleNewServiceBarterRequests(true)
                    }
                />
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
