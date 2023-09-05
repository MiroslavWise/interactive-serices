"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { ButtonDefault } from "@/components/common/Buttons"

import { useChat } from "@/store/hooks"
import { useAuth } from "@/store/hooks/useAuth"
import { useWebSocket } from "@/context/WebSocketProvider"

import styles from "./styles/style.module.scss"

export const FooterAsideLeft = () => {
    const { push } = useRouter()
    const { signOut } = useAuth()
    const { setCurrentChat } = useChat()
    const { socket } = useWebSocket()

    return (
        <footer className={styles.footer}>
            <ButtonDefault
                label="Выйти"
                prefix={
                    <Image
                        src="/svg/log-out.svg"
                        alt="out"
                        width={16}
                        height={16}
                    />
                }
                handleClick={() => {
                    signOut()
                    push(`/`)
                    setCurrentChat(undefined)
                    if (socket) {
                        socket?.disconnect()
                    }
                }}
            />
            <section>
                <p>Нужна помощь?</p>
                <p>Пишите нам в телеграм:</p>
                <a href="https://t.me/sheira" target="_blank">
                    @sheira
                </a>
            </section>
        </footer>
    )
}
