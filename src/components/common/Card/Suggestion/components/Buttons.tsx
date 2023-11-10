"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import type { IResponseOffers } from "@/services/offers/types"

import { ButtonDefault, ButtonFill } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { serviceOffers } from "@/services/offers"
import { useUpdateMutualOffer } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const Buttons = ({
    refetch,
    offer,
}: {
    offer: IResponseOffers
    refetch(): Promise<any>
}) => {
    const [loading, setLoading] = useState(false)
    const { systemTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const { dispatchUpdateMutual } = useUpdateMutualOffer()

    function handleUpdate() {
        dispatchUpdateMutual({
            visible: true,
            data: offer!,
        })
    }

    function handleDelete() {
        if (!loading) {
            setLoading(true)
            if (offer.id) {
                serviceOffers.delete(offer.id).then((response) => {
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
                    offer?.provider === "offer"
                        ? "Изменить предложение"
                        : offer?.provider === "request"
                        ? "Изменить запрос"
                        : "Изменить"
                }
                handleClick={handleUpdate}
                prefix={
                    <Image
                        src="/svg/edit-white.svg"
                        alt="edit"
                        width={16}
                        height={16}
                    />
                }
                classNames={cx(styles.buttonFill, styles[offer?.provider!])}
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
