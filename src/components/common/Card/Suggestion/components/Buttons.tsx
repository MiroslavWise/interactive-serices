"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { serviceOffer } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Buttons = ({
    id,
    refetch,
}: {
    id: number
    refetch(): Promise<any>
}) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { systemTheme } = useTheme()

    function handleDelete() {
        if (!loading) {
            setLoading(true)
            if (id) {
                serviceOffer.delete(id).then((response) => {
                    console.log("delete offer!", response)
                    requestAnimationFrame(() => {
                        refetch().finally(() => setLoading(false))
                    })
                })
            }
        }
    }

    return (
        <section className={styles.containerButtons}>
            <ButtonFill
                type={systemTheme === "dark" ? "primary" : "optional_pink"}
                label="Изменить предложение"
                prefix={
                    <Image
                        src="/svg/edit-white.svg"
                        alt="edit"
                        width={16}
                        height={16}
                    />
                }
                classNames={styles.buttonFill}
            />
            <motion.div
                className={styles.buttonTrash}
                data-open={isOpen}
                layout
                onClick={() => setIsOpen((prev) => !prev)}
                initial={{ borderRadius: 16 }}
            >
                {isOpen ? (
                    <>
                        <ButtonFill
                            handleClick={handleDelete}
                            label="Удалить"
                            type="primary"
                            suffix={
                                <Image
                                    src="/svg/trash-black.svg"
                                    alt="trash"
                                    width={16}
                                    height={16}
                                />
                            }
                            classNames={styles.buttonDelete}
                        />
                        <ButtonDefault
                            label="Отмена"
                            type="primary"
                            classNames={styles.buttonDelete}
                        />
                    </>
                ) : (
                    <Image
                        src="/svg/trash-black.svg"
                        alt="trash"
                        width={16}
                        height={16}
                    />
                )}
            </motion.div>
        </section>
    )
}
