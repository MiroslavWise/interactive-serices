"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TTextAreaSend } from "./types/types"
import type { IRequestPostMessages } from "@/services/messages/types"

import { ButtonFill } from "@/components/common/Buttons"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { cx } from "@/lib/cx"
import { serviceMessages } from "@/services/messages"
import { useWebSocket } from "@/context/WebSocketProvider"
import { TextArea } from "@/components/common/Inputs/components/TextArea"
import { useAuth, usePopupMenuChat, useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles/text-area.module.scss"

export const TextAreaSend: TTextAreaSend = ({
    photo,
    fullName,
    isBarter,
    idUser,
    refetch,
}) => {
    const { dispatchVisibleBarter } = useVisibleModalBarter()
    const { socket } = useWebSocket()
    const { userId } = useAuth()
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { isVisible, setIsVisible } = usePopupMenuChat()
    const { register, setValue, handleSubmit, watch, control } = useForm<{
        text: string
    }>({})
    const [loading, setLoading] = useState(false)

    function submit({ text }: { text: string }) {
        console.log("onSubmit: ", text)
        if (!loading) {
            setLoading(true)
            const date = new Date()
            const message = text.trim()
            const receiverIds = [Number(idUser)]
            if (message) {
                if (socket?.connected) {
                    console.log("socket?.connected: ", socket?.connected)
                    socket?.emit(
                        "chat",
                        {
                            receiverIds: receiverIds,
                            message: message,
                            threadId: Number(idThread!),
                            created: date,
                            parentId: undefined,
                        },
                        (response: any) => {
                            console.log("message response :", response)
                        },
                    )
                    requestAnimationFrame(() => {
                        setValue("text", "")
                        setLoading(false)
                    })
                } else {
                    const data: IRequestPostMessages = {
                        threadId: Number(idThread!),
                        message: message,
                        emitterId: Number(userId),
                        receiverIds: receiverIds,
                        enabled: true,
                        created: date,
                    }
                    serviceMessages.post(data).then((response) => {
                        requestAnimationFrame(() => {
                            refetch()
                        })
                        setValue("text", "")
                        setLoading(false)
                    })
                }
            }
        }
    }

    const onSubmit = handleSubmit(submit)

    return (
        <form
            onSubmit={onSubmit}
            className={cx(styles.container, isMobile && styles.mobile)}
        >
            {isMobile ? (
                <Image
                    src="/svg/paperclip-gray.svg"
                    alt="paperclip-gray"
                    width={16.5}
                    height={16.5}
                    className={styles.paperclip}
                />
            ) : null}
            {isMobile ? (
                <input
                    value={watch("text")}
                    placeholder="Введите сообщение..."
                    {...register("text", { required: true })}
                />
            ) : (
                <TextArea
                    placeholder="Введите сообщение..."
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    {...register("text", { required: true })}
                    maxLength={512}
                />
            )}
            {isMobile && isBarter ? (
                <ButtonCircleGradientFill
                    type="option-1"
                    image={{
                        src: "/svg/message-alert-circle.svg",
                        size: 24,
                    }}
                    size={48}
                    onClick={() => {
                        setIsVisible(true)
                    }}
                    submit="button"
                    className={styles.info}
                />
            ) : null}
            {isMobile ? (
                <ButtonCircleGradientFill
                    submit="submit"
                    type="option-1"
                    image={{
                        src: "/svg/send-white.svg",
                        size: 24,
                    }}
                    onClick={() => {}}
                    size={48}
                />
            ) : null}
            <div className={styles.buttons}>
                {!isMobile ? (
                    <ButtonFill
                        submit="submit"
                        type="secondary"
                        label="Отправить"
                        suffix={
                            <Image
                                src="/svg/send-white.svg"
                                alt="send"
                                width={24}
                                height={24}
                            />
                        }
                    />
                ) : null}
            </div>
        </form>
    )
}
