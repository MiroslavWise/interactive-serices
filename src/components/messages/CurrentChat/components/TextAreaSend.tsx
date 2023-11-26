"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TTextAreaSend } from "./types/types"
import type { IRequestPostMessages } from "@/services/messages/types"

import { Button } from "@/components/common"
import { TextArea } from "@/components/common/Inputs/components/TextArea"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { useAuth } from "@/store/hooks"
import { serviceMessages } from "@/services/messages"
import { useWebSocket } from "@/context/WebSocketProvider"

import styles from "./styles/text-area.module.scss"

export const TextAreaSend: TTextAreaSend = ({
    idUser,
    refetch,
    setStateMessages,
}) => {
    const searchParams = useSearchParams()
    const { socket } = useWebSocket()
    const userId = useAuth(({ userId }) => userId)
    const idThread = searchParams?.get("thread")
    const { register, setValue, handleSubmit, watch } = useForm<{
        text: string
    }>({})
    const [loading, setLoading] = useState(false)

    function submit({ text }: { text: string }) {
        if (!loading) {
            setLoading(true)
            const date = new Date()
            const message = text
            const receiverIds = [Number(idUser)]
            if (message) {
                setStateMessages((prev) => [
                    ...prev,
                    {
                        id: Math.random(),
                        message: message,
                        parentId: null,
                        threadId: Number(idThread!),
                        emitterId: Number(userId),
                        receiverIds: receiverIds,
                        temporary: true,
                        created: date,
                    },
                ])
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
        <form onSubmit={onSubmit} className={styles.container}>
            {isMobile ? (
                <Image
                    src="/svg/paperclip-gray.svg"
                    alt="paperclip-gray"
                    width={16.5}
                    height={16.5}
                    className={styles.paperclip}
                    unoptimized
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
                    <Button
                        type="submit"
                        label="Отправить"
                        typeButton="fill-orange"
                        suffixIcon={
                            <Image
                                src="/svg/send-white.svg"
                                alt="send"
                                width={24}
                                height={24}
                                unoptimized
                            />
                        }
                    />
                ) : null}
            </div>
        </form>
    )
}
