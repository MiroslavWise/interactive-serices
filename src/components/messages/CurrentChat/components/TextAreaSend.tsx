"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TTextAreaSend } from "./types/types"

import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { cx } from "@/lib/cx"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"
import { serviceMessages } from "@/services/messages"
import { useWebSocket } from "@/context/WebSocketProvider"
import { useSocketMessages } from "@/helpers/hooks/useSocketMessages"

import styles from "./styles/text-area.module.scss"
import { IRequestPostMessages } from "@/services/messages/types"

export const TextAreaSend: TTextAreaSend = ({
    photo,
    fullName,
    userIdInterlocutor,
}) => {
    const [text, setText] = useState("")
    const { setIsVisibleBarter } = useVisibleModalBarter()
    const { socket } = useWebSocket()
    const { userId } = useAuth()
    const searchParams = useSearchParams()
    const idThread = searchParams.get("thread")
    const { getSocketMessages } = useSocketMessages()

    function handleSend() {
        const message = text.trim()
        if (message) {
            if (socket?.connected) {
                socket?.emit(
                    "chat",
                    {
                        receiverIds: [userIdInterlocutor],
                        message: message,
                        threadId: idThread!,
                        created: new Date(),
                        parentId: undefined,
                    },
                    () => {},
                )
            } else {
                const data: IRequestPostMessages = {
                    threadId: Number(idThread!),
                    message: message,
                    parentId: undefined,
                    emitterId: Number(userId),
                    receiverIds: [userIdInterlocutor],
                    enabled: true,
                    created: new Date(),
                }
                serviceMessages.post(data).then((response) => {
                    getSocketMessages(Number(idThread!))
                    setText("")
                })
            }
        }
    }

    useEffect(() => {
        const dataMessage = (data: any) => {
            if (idThread) {
                getSocketMessages(Number(idThread!))
            }
        }

        if (socket) {
            socket?.on("chatResponse", dataMessage)

            return () => {
                socket?.off("chatResponse", dataMessage)
            }
        }
    }, [socket, getSocketMessages, idThread])

    return (
        <div className={cx(styles.container, isMobile && styles.mobile)}>
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
                    placeholder="Введите сообщение..."
                    value={text}
                    onChange={(val) => setText(val.target.value)}
                />
            ) : (
                <textarea
                    placeholder="Введите сообщение..."
                    value={text}
                    onChange={(val) => setText(val.target.value)}
                />
            )}
            {isMobile ? (
                <ButtonCircleGradientFill
                    type="option-1"
                    image={{
                        src: "/svg/send-white.svg",
                        size: 24,
                    }}
                    size={48}
                    onClick={handleSend}
                />
            ) : null}
            <div className={styles.buttons}>
                {!isMobile ? (
                    <>
                        <ButtonCircleGradient
                            type="option-1"
                            icon="/svg/repeat-orange.svg"
                            size={20}
                            handleClick={() => {
                                setIsVisibleBarter({
                                    isVisible: true,
                                    dataProfile: {
                                        photo: photo,
                                        fullName: fullName,
                                    },
                                })
                            }}
                        />
                        <ButtonFill
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
                            handleClick={handleSend}
                        />
                    </>
                ) : null}
            </div>
        </div>
    )
}
