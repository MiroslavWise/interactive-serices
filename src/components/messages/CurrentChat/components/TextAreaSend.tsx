"use client"

import { useState } from "react"
import Image from "next/image"
import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import type { TTextAreaSend } from "./types/types"

import { ButtonCircleGradient, ButtonFill } from "@/components/common/Buttons"
import { ButtonCircleGradientFill } from "@/components/common/Buttons/ButtonCircleGradientFill"

import { cx } from "@/lib/cx"
import { useVisibleModalBarter } from "@/store/hooks"
import { useWebSocket } from "@/context/WebSocketProvider"

import styles from "./styles/text-area.module.scss"

export const TextAreaSend: TTextAreaSend = ({
    photo,
    fullName,
    userIdInterlocutor,
}) => {
    const [text, setText] = useState("")
    const { setIsVisibleBarter } = useVisibleModalBarter()
    const { socket } = useWebSocket()
    const searchParams = useSearchParams()
    const idThread = searchParams.get("thread")

    function handleSend() {
        if (text) {
            const data = {
                receiverIds: [userIdInterlocutor],
                message: text,
                threadId: idThread!,
                created: new Date(),
                parentId: undefined,
            }
            socket?.emit("chat", data, (response: any) => {
                console.log(
                    ` --- response message chat ${userIdInterlocutor} ---`,
                    response,
                )
            })
        }
        setText("")
    }

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
