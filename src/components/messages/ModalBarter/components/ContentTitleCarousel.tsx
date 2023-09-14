"use client"

import { useState } from "react"

import {
    CustomDatePicker,
    CustomInputText,
    CustomSelect,
} from "@/components/common/custom"
import { BadgeCoinsPlus } from "./BadgeCoinsPlus"

import { BARTER_LIST } from "@/mocks/components/messages/barter-list"

import styles from "./styles/style.module.scss"
import { ButtonFill } from "@/components/common/Buttons"
import Image from "next/image"
import { TValue } from "@/components/common/custom/Select/types"

export const ContentTitleCarousel = ({}) => {
    const [value, setValue] = useState<TValue>("")

    return (
        <section className={styles.containerTitleCarousel}>
            <h2>Пожалуйста, выберите параметры бартера</h2>
            <BadgeCoinsPlus />
            <div className={styles.barterContainer}>
                <div className={styles.itemBarterContainer}>
                    <p>Я могу</p>
                    <CustomSelect
                        placeholder="Выберите категории"
                        list={BARTER_LIST}
                        value={value}
                        setValue={setValue}
                    />
                </div>
                <div className={styles.itemBarterContainer}>
                    <p>Предлагаю</p>
                    <CustomDatePicker />
                    <CustomInputText placeholder="Введите адрес" />
                </div>
            </div>
            <div className={styles.button}>
                <ButtonFill
                    type="primary"
                    label="Предложить бартер"
                    suffix={
                        <Image
                            src="/svg/arrow-right.svg"
                            alt="arrow-right"
                            width={24}
                            height={24}
                        />
                    }
                />
            </div>
        </section>
    )
}
