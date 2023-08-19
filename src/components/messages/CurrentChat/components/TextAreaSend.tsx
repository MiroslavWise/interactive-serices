"use client"

import { TTextAreaSend } from "./types/types"

import styles from "./styles/text-area.module.scss"
import { ButtonFill } from "@/components/common/Buttons"
import Image from "next/image"

export const TextAreaSend: TTextAreaSend = ({ }) => {

  return (
    <div className={styles.container}>
      <textarea
        placeholder="Введите сообщение..."
      />
      <div className={styles.buttons}>
        <ButtonFill
          type="secondary"
          label="Отправить"
          suffix={<Image src="/svg/send-white.svg" alt="send" width={24} height={24} />}
        />
      </div>
    </div>
  )
}