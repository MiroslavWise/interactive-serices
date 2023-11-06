"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import type { TTypeProvider } from "@/services/file-upload/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"

import styles from "./styles/style.module.scss"

export const Buttons = ({
    id,
    refetch,
    provider,
}: {
    id: number
    provider: TTypeProvider
    refetch(): Promise<any>
}) => {
    const [loading, setLoading] = useState(false)
    const { systemTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    function handleDelete() {
        if (!loading) {
            setLoading(true)
            if (id) {
                serviceOffers.delete(id).then((response) => {
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
                label={
                    provider === "offer"
                        ? "Изменить предложение"
                        : provider === "request"
                        ? "Изменить запрос"
                        : "Изменить"
                }
                prefix={
                    <Image
                        src="/svg/edit-white.svg"
                        alt="edit"
                        width={16}
                        height={16}
                    />
                }
                classNames={cx(styles.buttonFill, styles[provider])}
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
