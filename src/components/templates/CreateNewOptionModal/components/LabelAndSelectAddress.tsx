"use client"

import { useMemo } from "react"

import type {
    ISelectList,
    TValue,
} from "@/components/common/custom/Select/types"
import type { TLabelAndSelectAddress } from "./types/types"

import { CustomSelect } from "@/components/common/custom"

import { useAuth } from "@/store/hooks"

import styles from "./styles/label-input.module.scss"

export const LabelAndSelectAddress: TLabelAndSelectAddress = ({
    value,
    setValue,
}) => {
    const { addresses } = useAuth()

    const list = useMemo(() => {
        if (!addresses) {
            return []
        }

        return (
            addresses.map(
                (item) =>
                    ({
                        label: item.additional,
                        value: item.id,
                    }) as ISelectList,
            ) || []
        )
    }, [addresses])

    return (
        <div className={styles.container}>
            <p>Введите свой адрес</p>
            <CustomSelect
                placeholder="Введите свой адрес, чтобы мы могли показать ваше предложение на карте"
                list={list}
                value={value?.id || addresses?.[0]?.id!}
                setValue={(value: TValue) => {
                    const valueCategory = addresses?.find(
                        (item) => Number(item.id) === Number(value),
                    )!
                    setValue({
                        id: valueCategory?.id!,
                    })
                }}
            />
        </div>
    )
}
