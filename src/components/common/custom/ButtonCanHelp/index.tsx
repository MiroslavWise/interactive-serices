import { useState } from "react"
import { motion } from "framer-motion"

import type { IProps } from "./types"

import { Button, ButtonClose } from "@/components/common"

import { usePush } from "@/helpers"
import { useAuth, dispatchAuthModal } from "@/store/hooks"

import styles from "./style.module.scss"

export const ButtonCanHelp = ({ id, idUser }: IProps) => {
    const userId = useAuth(({ userId }) => userId)
    const { handlePush } = usePush()
    const [visible, setVisible] = useState(false)

    function handle() {
        console.log("handle: -----")
        if (idUser === userId && !!userId) {
            return
        } else if (userId !== idUser) {
            if (!userId) {
                setVisible(true)
            } else if (!!userId) {
                handlePush(`/messages?user=${userId}`)
            }
        }
    }

    return (
        <div
            className={styles.container}
            data-is-me={idUser === userId && !!userId}
            onClick={(event) => {
                event.stopPropagation()
                handle()
            }}
        >
            <motion.div data-is-motion data-open={visible} layout>
                {visible ? (
                    <div data-enter>
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
                ) : (
                    <button disabled={idUser === userId && !!userId} data-help>
                        <span>Могу помочь</span>
                    </button>
                )}
            </motion.div>
        </div>
    )
}
