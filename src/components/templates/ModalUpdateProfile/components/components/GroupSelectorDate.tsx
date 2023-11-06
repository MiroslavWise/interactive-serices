"use client"

import { isMobile } from "react-device-detect"
import { useMemo } from "react"
import dayjs from "dayjs"

import type { TGroupSelectorDate } from "./types/types"

import { Selectors } from "@/components/common/Selectors"

import { cx } from "@/lib/cx"
import { MONTHS, rangeArray } from "@/helpers"

import styles from "./styles/style.module.scss"

export const GroupSelectorDate: TGroupSelectorDate = ({
    watchDay,
    watchMonth,
    watchYear,
    errorDate,
    set,
    propsRegister,
    label,
}) => {
    const rangeDate: {
        days: { value: any; label: any }[]
        months: { value: any; label: any }[]
        years: { value: any; label: any }[]
    } = useMemo(() => {
        return {
            days: rangeArray(1, 31).map((item) => ({
                value: item,
                label: item,
            })),
            months: MONTHS,
            years: rangeArray(1900, Number(dayjs().format("YYYY")) - 18)
                .reverse()
                .map((item) => ({ value: item, label: item })),
        }
    }, [])

    const error: boolean | undefined = useMemo(() => {
        return !!Object.values(errorDate).filter((_) => _).length
    }, [errorDate])

    return (
        <div
            className={cx(
                styles.containerLabelInput,
                isMobile && styles.mobile,
            )}
        >
            <label>
                {label} <sup>*</sup>
            </label>
            <div className={styles.groupInputError}>
                <div className={styles.selectors}>
                    <Selectors
                        label="День"
                        options={rangeDate.days}
                        watchField={watchDay}
                        set={set}
                        param="day"
                        register={propsRegister.day}
                    />
                    <Selectors
                        label="Месяц"
                        options={rangeDate.months}
                        watchField={watchMonth}
                        set={set}
                        param="month"
                        register={propsRegister.month}
                    />
                    <Selectors
                        label="Год"
                        options={rangeDate.years}
                        watchField={watchYear}
                        set={set}
                        param="year"
                        register={propsRegister.year}
                    />
                </div>
                {error ? (
                    <p className={styles.error}>Данное поле обязательно</p>
                ) : null}
            </div>
        </div>
    )
}
