"use client"

import { type TButtonPropsDefault } from "./types/types"

import { cx } from "@/lib/cx"

export const ButtonDefault: TButtonPropsDefault = ({
  label,
  handleClick,
  disabled,
  classNames,
  prefix,
}) => {
  return (
    <button
      className={cx("button-default", disabled && "disabled", classNames)}
      onClick={handleClick}
    >
      {prefix ? prefix : null}
      <span>{label}</span>
    </button>
  )
}