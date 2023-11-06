import type { Dispatch, FC } from "react"
import type { Nullable } from "primereact/ts-helpers"

interface ICustomDatePicker {
    setDate: Dispatch<Nullable<Date>>
}

export type TCustomDatePicker = FC<ICustomDatePicker>
