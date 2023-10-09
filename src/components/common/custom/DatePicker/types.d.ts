import { Dispatch, FC } from "react"

interface ICustomDatePicker {
    setDate: Dispatch<Date | string | null>
}

export type TCustomDatePicker = FC<ICustomDatePicker>
