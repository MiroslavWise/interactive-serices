"use client"

import { LabelAndInput } from "../../components/LabelAndInput"
import { LabelAndSelectOffersCategories } from "../../components/LabelAndSelectOffersCategories"

import { useCreateOffer } from "@/store/state/useCreateOffer"

import styles from "./styles/service-selection.module.scss"
import { SelectAndTextarea } from "../../components/SelectAndTextarea"

export const ServiceSelection = () => {
    const { text, valueCategory, setText, setValueCategory } = useCreateOffer()

    return (
        <section className={styles.wrapper}>
            <p>
                В раскрывающемся меню ниже выберите услугу, которую вы готовы
                предложить публично.
            </p>
            <SelectAndTextarea>
                <LabelAndSelectOffersCategories
                    title="Предложение"
                    placeholder="Выберите категории"
                    value={valueCategory!}
                    setValue={setValueCategory}
                />
                <LabelAndInput
                    title="Добавьте текст, чтобы сделать ваше предложение более привлекательным и желанным."
                    text={text}
                    setText={setText}
                    placeholder="Напишите что-нибудь"
                />
            </SelectAndTextarea>
        </section>
    )
}
