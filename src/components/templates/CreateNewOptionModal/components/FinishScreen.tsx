"use client"

import { useMemo } from "react"
import { isMobile } from "react-device-detect"

import type { TAddCreate } from "@/store/types/useAddCreateModal"

import { ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { ImageStatic } from "@/components/common/Image"
import { useAddCreateModal } from "@/store/state/useAddCreateModal"
import { useCloseCreateOptions } from "@/helpers/hooks/useCloseCreateOptions"

import styles from "./styles/finish-screen.module.scss"

export const FinishScreen = () => {
    const { close } = useCloseCreateOptions()
    const { typeAdd } = useAddCreateModal()

    const content: string | null = useMemo(() => {
        if (!typeAdd) return null
        const obj: Record<TAddCreate, string> = {
            offer: "Поздравляем! Скоро мы добавим ваше предложение на карту Шейры. Ваше предложение увидят сотни людей — просто будьте готовы ответить.",
            request:
                "Поздравляем! Скоро мы добавим ваш запрос на карту Шейры. Ваш запрос увидят сотни людей — просто будьте готовы ответить.",
            alert: "Поздравляем! Скоро мы добавим ваше SOS-сообщение на карту Шейры. Сотни людей увидят ваше предупреждение и могут оказать некоторую помощь.",
            discussion:
                "Поздравляем! Скоро мы добавим ваше SOS-сообщение на карту Шейры. Сотни людей увидят ваше предупреждение и могут оказать некоторую помощь.",
        }

        return obj[typeAdd]
    }, [typeAdd])

    return (
        <div className={cx(styles.wrapper, isMobile && styles.mobile)}>
            <section>
                <ImageStatic
                    src="/png/welcome/girl-fest.png"
                    alt="girl-fest"
                    height={294}
                    width={654}
                />
                <h3>{content}</h3>
            </section>
            <ButtonFill
                type="primary"
                label="Хорошо"
                handleClick={close}
                classNames={styles.button}
            />
        </div>
    )
}
