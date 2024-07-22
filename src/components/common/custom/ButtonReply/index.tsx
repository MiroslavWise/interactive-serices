import { useState } from "react"
import { useTheme } from "next-themes"

import type { TProps } from "./types"
import { EnumTypeProvider } from "@/types/enum"

import { Button, ButtonCircleGradient, ButtonClose } from "@/components/common"

import { usePush } from "@/helpers"
import { useAuth, dispatchAuthModal, dispatchReciprocalExchange } from "@/store"

import styles from "./style.module.scss"

export const ButtonReplyPrimary: TProps = ({ profile, offer, isBalloon }) => {
  const [visible, setVisible] = useState(false)
  const { handlePush } = usePush()
  const { systemTheme } = useTheme()
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  function handleBarter() {
    const provider = offer?.provider!
    if (userId) {
      if (provider === EnumTypeProvider.offer) {
        dispatchReciprocalExchange({
          visible: true,
          type: "current",
          offer: offer,
          profile: profile!,
        })
      }
    }
  }

  function handle() {
    if (userId && userId === offer?.userId) {
      return
    }
    if (userId !== offer?.userId) {
      if (!!userId) {
        handleBarter()
      } else if (!userId) {
        setVisible(true)
      }
    }
  }

  return (
    <div className={styles.wrapperPrimary} data-ballon={isBalloon}>
      {isBalloon ? (
        <>
          <Button
            data-reply
            type="button"
            typeButton={"fill-orange"}
            label="Откликнутся"
            disabled={userId === offer?.userId}
            onClick={(event) => {
              handle()
              event.stopPropagation()
            }}
          />
          <ButtonCircleGradient
            type="primary"
            icon="/svg/message-dots-circle-primary.svg"
            handleClick={() => {
              if (userId && userId === offer?.userId) {
                return
              }
              if (userId !== offer?.userId) {
                if (!!userId) {
                  handlePush(`/chat?user=${offer?.userId!}`)
                } else if (!userId) {
                  setVisible(true)
                }
              }
            }}
          />
        </>
      ) : (
        <Button
          data-reply
          type="button"
          typeButton={systemTheme === "light" ? "fill-orange" : "fill-primary"}
          label="Откликнутся"
          disabled={userId === offer?.userId}
          onClick={(event) => {
            handle()
            event.stopPropagation()
          }}
        />
      )}
      {!userId ? (
        <div data-enter data-visible={visible}>
          <div data-inform>
            <ButtonClose
              position={{ top: "0px", right: "0px" }}
              onClick={(event) => {
                event?.stopPropagation()
                setVisible(false)
              }}
            />
            <h3>
              Для того чтобы, создавать предложения, совершать обмены и оставлять отзывы и комментарии вам нужно войти или
              зарегистрироваться
            </h3>
            <Button
              type="button"
              typeButton="fill-primary"
              label="Войти"
              onClick={(event) => {
                event.stopPropagation()
                setVisible(false)
                dispatchAuthModal({
                  visible: true,
                  type: "SignIn",
                })
              }}
            />
            <Button
              type="button"
              typeButton="regular-primary"
              label="Зарегистрироваться"
              onClick={(event) => {
                event.stopPropagation()
                setVisible(false)
                dispatchAuthModal({
                  visible: true,
                  type: "SignUp",
                })
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
