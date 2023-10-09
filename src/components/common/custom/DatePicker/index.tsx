"use client"

import { SyntheticEvent, useState } from "react"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"

import type { TCustomDatePicker } from "./types"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"
import "./date-picker.scss"
import Image from "next/image"

export const CustomDatePicker: TCustomDatePicker = ({ setDate }) => {
    const [date, setDate_] = useState<Date | null>(null)

    function handleDateChange(
        value: Date | null,
        event: SyntheticEvent<any, Event> | undefined,
    ) {
        event?.preventDefault()
        setDate_(value)
        setDate(value || null)
    }
    return (
        <div className={cx(styles.container, date && styles.active)}>
            {date ? null : <span>Выбрать дату</span>}
            <DatePicker
                selected={date}
                autoComplete={dayjs().format("DD.MM.YYYY")}
                onChange={(value, event) => handleDateChange(value, event)}
                className={styles.datePicker}
            />
            <Image
                src="/svg/calendar-black.svg"
                alt="calendar"
                width={20}
                height={20}
                style={{
                    pointerEvents: "none",
                    zIndex: 11,
                    justifySelf: "flex-end",
                }}
            />
        </div>
    )
}
