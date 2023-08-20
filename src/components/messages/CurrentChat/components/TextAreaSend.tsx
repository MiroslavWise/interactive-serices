"use client"

import { isMobile } from "react-device-detect"
import Image from "next/image"

import type { TTextAreaSend } from "./types/types"

import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"

import { useVisibleModalBarter } from "@/store/hooks"
import { cx } from "@/lib/cx"

import styles from "./styles/text-area.module.scss"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

export const TextAreaSend: TTextAreaSend = ({ photo, fullName }) => {
  const { setIsVisibleBarter } = useVisibleModalBarter()

  return (
    <div className={cx(styles.container, isMobile && styles.mobile)}>
      {isMobile ? <input placeholder="Введите сообщение..." /> : <textarea placeholder="Введите сообщение..." />}
      {
        isMobile ? (
          <ButtonCircleGradientFill
            type="option-1"
            image={{
              src: "/svg/send-white.svg",
              size: 24,
            }}
            size={48}
            onClick={() => { }}
          />
        ) : null
      }
      <div className={styles.buttons}>
        {
          !isMobile ? (
            <>
              <ButtonCircleGradient
                type="option-1"
                icon="/svg/repeat-orange.svg"
                size={20}
                handleClick={() => {
                  setIsVisibleBarter({ isVisible: true, dataProfile: { photo: photo, fullName: fullName, } })
                }}
              />
              <ButtonFill
                type="secondary"
                label="Отправить"
                suffix={<Image src="/svg/send-white.svg" alt="send" width={24} height={24} />}
              />
            </>
          ) : null
        }
      </div>
    </div>
  )
}