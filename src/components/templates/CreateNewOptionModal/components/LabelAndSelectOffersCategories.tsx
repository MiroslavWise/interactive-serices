"use client"

import { useMemo } from "react"

import type { TLabelAndSelectOffersCategories } from "./types/types"
import type {
    ISelectList,
    TValue,
} from "@/components/common/custom/Select/types"

import { CustomSelect } from "@/components/common/custom"

import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/label-input.module.scss"

export const LabelAndSelectOffersCategories: TLabelAndSelectOffersCategories =
    ({ title, placeholder, value, setValue }) => {
        const { categories } = useOffersCategories()

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
            <div className={styles.container}>
                <p>{title}</p>
                <CustomSelect
                    placeholder={placeholder}
                    list={list}
                    value={value?.id}
                    setValue={(value: TValue) => {
                        const valueCategory = categories.find(
                            (item) => Number(item?.id) === Number(value),
                        )
                        setValue({
                            id: valueCategory?.id!,
                            slug: valueCategory?.provider!,
                        })
                    }}
                />
            </div>
        )
    }
