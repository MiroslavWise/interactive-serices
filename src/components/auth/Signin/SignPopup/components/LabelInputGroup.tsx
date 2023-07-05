import { type FC, useMemo } from "react"
import { type RegisterOptions, type FieldError, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form"
import { isMobile } from "react-device-detect"
import dayjs from "dayjs"

import { rangeArray, MONTHS } from "@/helpers"
import { Selectors } from "@/components/common/Selectors"

import { cx } from "@/lib/cx"

import styles from "./styles/form-input.module.scss"

type TLabelInputGroup = FC<{
  label: string
  rules?: boolean
  placeholder: string
  type: "text" | "email" | "password"
  propsInput: UseFormRegisterReturn
  errorMessage?: string
}>

type TGroupSelectorDate = FC<{
  watchDay: any
  watchMonth: any
  watchYear: any
  set: UseFormSetValue<any>
  errorDate: {
    day: FieldError | undefined
    month: FieldError | undefined
    year: FieldError | undefined
  }
  propsRegister: {
    day: UseFormRegisterReturn
    month: UseFormRegisterReturn
    year: UseFormRegisterReturn
  }
}>

export const LabelInputGroup: TLabelInputGroup = ({
  label, rules, placeholder, type, propsInput, errorMessage,
}) => {

  return (
    <div className={cx(styles.groupLabelAndInputWrap, isMobile && styles.mobile)}>
      <label>{label} {rules ? <sup>*</sup> : null}</label>
      <div className={styles.groupInputError}>
        <input
          type={type}
          placeholder={placeholder}
          {...propsInput}
          className={cx(errorMessage && styles.errorInput)}
        />
        {
          errorMessage
            ? (
              <p className={styles.error}>
                {errorMessage}
              </p>
            ) : null
        }
      </div>
    </div>
  )
}

export const GroupSelectorDate: TGroupSelectorDate = ({
  watchDay, watchMonth, watchYear, errorDate, set, propsRegister,
}) => {
  const rangeDate: {
    days: { value: any, label: any }[]
    months: { value: any, label: any }[]
    years: { value: any, label: any }[]
  } = useMemo(() => {
    return {
      days: rangeArray(1, 31).map(item => ({ value: item, label: item })),
      months: MONTHS,
      years: rangeArray(1900, Number(dayjs().format("YYYY")) - 18).reverse().map(item => ({ value: item, label: item })),
    }
  }, [])
  return (
    <div className={cx(styles.groupLabelAndInputWrap, isMobile && styles.mobile)}>
      <label>Дата рождения <sup>*</sup></label>
      <div className={styles.groupInputError}>
        <div className={styles.selectors}>
          <Selectors
            label="Месяц"
            options={rangeDate.months}
            watchField={watchMonth}
            set={set}
            param="month"
            register={propsRegister.month}
          />
          <Selectors
            label="День"
            options={rangeDate.days}
            watchField={watchDay}
            set={set}
            param="day"
            register={propsRegister.day}
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
        {
          (errorDate?.day || errorDate?.month || errorDate?.year)
            ? (
              <p className={styles.error}>Данное поле обязательно</p>
            ) : null
        }
      </div>
    </div>
  )
}