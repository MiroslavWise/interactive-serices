"use client"

import { useState } from "react"

import { CustomSelect } from "@/components/common/custom"
import { CustomTextArea } from "@/components/common/custom/TextArea"

import { BARTER_LIST } from "@/mocks/components/messages/barter-list"

import styles from "./styles/service-selection.module.scss"
import { useCreateOffer } from "@/store/state/useCreateOffer"

export const ServiceSelection = () => {
    const [value, setValue] = useState("")
    const { text, valueCategory, setText, setValueCategory } = useCreateOffer()

    return (
        <section className={styles.wrapper}>
            <p>
                В раскрывающемся меню ниже выберите услугу, которую вы готовы
                предложить публично.
            </p>
            <div className={styles.selectAndTextarea}>
                <div className={styles.labelAndInput}>
                    <p>Предложение</p>
                    <CustomSelect
                        placeholder="Выберите категории"
                        list={BARTER_LIST}
                        value={valueCategory}
                        setValue={setValueCategory}
                    />
                </div>
                <div className={styles.labelAndInput}>
                    <p>
                        Добавьте текст, чтобы сделать ваше предложение более
                        привлекательным и желанным.
                    </p>
                    <CustomTextArea
                        value={text}
                        setValue={setText}
                        placeholder="Напишите что-нибудь"
                    />
                </div>
            </div>
        </section>
    )
}
