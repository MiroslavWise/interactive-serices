"use client"

import { useMemo, useState } from "react"
import Image from "next/image"

import type {
    ISelectList,
    TValue,
} from "@/components/common/custom/Select/types"
import type { TContent } from "../types/types"

import {
    CustomDatePicker,
    CustomInputText,
    CustomSelect,
} from "@/components/common/custom"
import { BadgeCoinsPlus } from "./BadgeCoinsPlus"
import { ButtonFill } from "@/components/common/Buttons"

import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"
import { useVisibleModalBarter } from "@/store/hooks"

export const ContentTitleCarousel: TContent = ({
    register,
    setValue,
    watch,
    address,
}) => {
    const { categories } = useOffersCategories()

    const CATEGORIES: ISelectList[] = useMemo(() => {
        return (
            categories?.map((item) => ({
                prefix: "/mocks/hair.png",
                label: item.title,
                value: item.id,
            })) || []
        )
    }, [categories])

    return (
        <section className={styles.containerTitleCarousel}>
            <h2>Пожалуйста, выберите параметры бартера</h2>
            <BadgeCoinsPlus />
            <div className={styles.barterContainer}>
                <div
                    className={styles.itemBarterContainer}
                    {...register("categoryId", { required: true })}
                >
                    <p>Я могу</p>
                    <CustomSelect
                        placeholder="Выберите категории"
                        list={CATEGORIES}
                        value={watch("categoryId")}
                        setValue={(value: any) => {
                            setValue("categoryId", value as number)
                        }}
                    />
                </div>
                <div className={styles.itemBarterContainer}>
                    <p>Предлагаю</p>
                    <CustomDatePicker
                        setDate={(value) => setValue("date", value)}
                    />
                    <p>По адресу</p>
                    <i>{address}</i>
                </div>
            </div>
            <div className={styles.button}>
                <ButtonFill
                    submit="submit"
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
