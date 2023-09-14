"use client"

import { useMemo } from "react"

import type {
    ISelectList,
    TValue,
} from "@/components/common/custom/Select/types"

import { CustomSelect } from "@/components/common/custom"
import { CustomTextArea } from "@/components/common/custom/TextArea"

import { useCreateOffer } from "@/store/state/useCreateOffer"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/service-selection.module.scss"

export const ServiceSelection = () => {
    const { categories } = useOffersCategories()

    const { text, valueCategory, setText, setValueCategory } = useCreateOffer()

    const list = useMemo(() => {
        return (
            categories.map(
                (item) =>
                    ({
                        label: item.title,
                        value: item.id,
                    }) as ISelectList,
            ) || []
        )
    }, [categories])

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
                        list={list}
                        value={valueCategory?.id!}
                        setValue={(value: TValue) => {
                            const valueCategory = categories.find(
                                (item) => Number(item?.id) === Number(value),
                            )
                            setValueCategory({
                                id: valueCategory?.id!,
                                slug: valueCategory?.provider!,
                            })
                        }}
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
