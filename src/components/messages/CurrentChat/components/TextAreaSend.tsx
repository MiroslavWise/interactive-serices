"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState } from "react"

import type { TTextAreaSend } from "./types/types"
import type { IRequestPostMessages } from "@/services/messages/types"

import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { cx } from "@/lib/cx"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { serviceMessages } from "@/services/messages"
import { useWebSocket } from "@/context/WebSocketProvider"

import styles from "./styles/text-area.module.scss"

export const TextAreaSend: TTextAreaSend = ({
    photo,
    fullName,
    idUser,
    refetch,
}) => {
    const { dispatchVisibleBarter: setIsVisibleBarter } =
        useVisibleModalBarter()
    const { socket } = useWebSocket()
    const { userId } = useAuth()
    const searchParams = useSearchParams()
    const idThread = searchParams?.get("thread")
    const { register, setValue, handleSubmit, watch } = useForm<{
        text: string
    }>({})
    const [loading, setLoading] = useState(false)

    function onSubmit({ text }: { text: string }) {
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
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
                <textarea
                    value={watch("text")}
                    placeholder="Введите сообщение..."
                    {...register("text", { required: true })}
                />
            )}
            {isMobile ? (
                <ButtonCircleGradientFill
                    submit="submit"
                    type="option-1"
                    image={{
                        src: "/svg/send-white.svg",
                        size: 24,
                    }}
                    size={48}
                    onClick={() => {}}
                />
            ) : null}
            <div className={styles.buttons}>
                {!isMobile ? (
                    <>
                        {/* <ButtonCircleGradient
                            type="option-1"
                            icon="/svg/repeat-orange.svg"
                            size={20}
                            handleClick={() => {
                                setIsVisibleBarter({
                                    isVisible: true,
                                    dataProfile: {
                                        photo: photo,
                                        fullName: fullName,
                                        idUser: idUser,
                                    },
                                })
                            }}
                        /> */}
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
                    </>
                ) : null}
            </div>
        </form>
    )
}
