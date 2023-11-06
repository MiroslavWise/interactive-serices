"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { SyntheticEvent, useEffect, useState } from "react"

import type { TCustomDatePicker } from "./types"

import { cx } from "@/lib/cx"

import "./date-picker.scss"
import styles from "./style.module.scss"

export const CustomDatePicker: TCustomDatePicker = ({ setDate }) => {
    const [date, setDate_] = useState<null>(null)

    useEffect(() => {

    }, [])

    return (
        <div className={cx(styles.container, date && styles.active)}>
            {date ? null : <span>Выбрать дату</span>}
            
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
