"use client"

import { useEffect, useMemo } from "react"

import type {
    ISelectList,
    TValue,
} from "@/components/common/custom/Select/types"
import type { TLabelAndSelectAddress } from "./types/types"

import { useAddress } from "@/helpers"
import { CustomSelect } from "@/components/common/custom"

import styles from "./styles/label-input.module.scss"

export const LabelAndSelectAddress: TLabelAndSelectAddress = ({
    value,
    setValue,
}) => {
    const { addressMainMany, addressMain } = useAddress()

    const list: ISelectList[] = useMemo(() => {
        return (
            addressMainMany?.map((item) => ({
                label: item?.additional!,
                value: item?.id!,
            })) || []
        )
    }, [addressMainMany])

    useEffect(() => {
        if (addressMain) {
            setValue({ id: addressMain?.id! })
        }
    }, [addressMain, setValue])

    return (
        <div className={styles.container}>
            <p>Введите свой адрес</p>
            <CustomSelect
                placeholder="Введите свой адрес, чтобы мы могли показать ваше предложение на карте"
                list={list}
                value={value?.id!}
                setValue={(value: TValue) => {
                    setValue({
                        id: Number(value!),
                    })
                }}
            />
        </div>
    )
}
