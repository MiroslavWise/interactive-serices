"use client"

import { Dispatch, SetStateAction } from "react"

import type { TTypeProvider } from "@/services/file-upload/types"

import { Button, ImageStatic } from "@/components/common"

import { closeCreateOffers } from "@/store/state/useAddCreateModal"

import styles from "./styles/finish-screen.module.scss"

export const FinishScreen = ({ typeAdd, setIsFirst }: { typeAdd: TTypeProvider; setIsFirst: Dispatch<SetStateAction<boolean>> }) => {
    function onClose() {
        closeCreateOffers()
        setTimeout(() => {
            setIsFirst(true)
        }, 151)
    }

    return (
        <div className={styles.wrapper}>
            <article>
                <ImageStatic src="/png/welcome/girl-fest.png" alt="girl-fest" height={294} width={654} />
                <h3>
                    {typeAdd === "alert"
                        ? "Поздравляем! Скоро мы добавим ваше SOS-сообщение на карту Шейры. Сотни людей увидят ваше предупреждение и могут оказать некоторую помощь."
                        : typeAdd === "discussion"
                        ? "Поздравляем! Скоро мы добавим ваше обсуждение на карту Шейры. Сотни людей увидят вашу мысль, и будут рады обсудить её с вами."
                        : typeAdd === "offer"
                        ? "Поздравляем! Скоро мы добавим ваше предложение на карту Шейры. Ваше предложение увидят сотни людей — просто будьте готовы ответить."
                        : null}
                </h3>
            </article>
            <Button type="button" typeButton="fill-primary" label="Хорошо" onClick={onClose} />
        </div>
    )
}
