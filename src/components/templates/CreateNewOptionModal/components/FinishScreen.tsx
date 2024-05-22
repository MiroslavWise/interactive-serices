"use client"

import { EnumTypeProvider } from "@/types/enum"

import { Button, ImageStatic } from "@/components/common"

import { closeCreateOffers, dispatchModalClose } from "@/store"

import styles from "../styles/finish-screen.module.scss"

export const FinishScreen = ({ typeAdd }: { typeAdd: EnumTypeProvider }) => {
  function onClose() {
    closeCreateOffers()
    dispatchModalClose()
  }

  return (
    <div className={styles.wrapper}>
      <article>
        <ImageStatic src="/png/welcome/girl-fest.png" alt="girl-fest" height={294} width={654} />
        <h3>
          {typeAdd === EnumTypeProvider.alert
            ? "Поздравляем! Скоро мы добавим ваше SOS-сообщение на карту Шейры. Сотни людей увидят ваше предупреждение и могут оказать некоторую помощь."
            : typeAdd === EnumTypeProvider.discussion
            ? "Поздравляем! Скоро мы добавим ваше обсуждение на карту Шейры. Сотни людей увидят вашу мысль, и будут рады обсудить её с вами."
            : typeAdd === EnumTypeProvider.offer
            ? "Поздравляем! Скоро мы добавим ваше предложение на карту Шейры. Ваше предложение увидят сотни людей — просто будьте готовы ответить."
            : null}
        </h3>
      </article>
      <Button type="button" typeButton="fill-primary" label="Хорошо" onClick={onClose} />
    </div>
  )
}
