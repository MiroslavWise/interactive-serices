"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"
import {
    useCallback,
    useEffect,
    useInsertionEffect,
    useRef,
    useState,
} from "react"

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

export const TextAreaSend: TTextAreaSend = ({ photo, fullName }) => {
    const [text, setText] = useState("")
    const { setIsVisibleBarter } = useVisibleModalBarter()
    const { socket } = useWebSocket()
    const { userId } = useAuth()
    const searchParams = useSearchParams()
    const idUserInterlocutor = searchParams?.get("user")
    const idThread = searchParams?.get("thread")
    const { getSocketMessages } = useSocketMessages()
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

    const handleSend = useCallback(() => {
        const date = new Date()
        const message = text.trim()
        const receiverIds = [Number(idUserInterlocutor)]
        if (message) {
            if (socket?.connected) {
                socket?.emit(
                    "chat",
                    {
                        receiverIds: receiverIds,
                        message: message,
                        threadId: idThread!,
                        created: date,
                        parentId: undefined,
                    },
                    (response: any) => {
                        console.log("message response :", response)
                        setTimeout(() => {
                            getSocketMessages(Number(idThread!))
                        }, 100)
                        setText("")
                    },
                )
            } else {
                const data: IRequestPostMessages = {
                    threadId: Number(idThread!),
                    message: message,
                    parentId: 1,
                    emitterId: Number(userId),
                    receiverIds: receiverIds,
                    enabled: true,
                    created: date,
                }
                serviceMessages.post(data).then((response) => {
                    setTimeout(() => {
                        getSocketMessages(Number(idThread!))
                    }, 100)
                    setText("")
                })
            }
        }
    }, [text, getSocketMessages, idThread, socket, userId, idUserInterlocutor])

    const keyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.keyCode == 13) {
                handleSend()
            }
        },
        [handleSend],
    )

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

    useInsertionEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("keydown", keyPress)

            return () =>
                inputRef.current?.removeEventListener("keydown", keyPress)
        }
    }, [inputRef.current, text])

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
                    ref={inputRef}
                    placeholder="Введите сообщение..."
                    value={text}
                    onChange={(val) => setText(val.target.value)}
                />
            ) : (
                <textarea
                    ref={inputRef}
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
