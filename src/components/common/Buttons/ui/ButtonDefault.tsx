"use client"

import { type TButtonPropsDefault } from "./types"

import { cx } from "@/lib/cx"

export const ButtonDefault: TButtonPropsDefault = ({
  label,
  handleClick,
  disabled,
  classNames,
}) => {
  return (
    <button
      className={cx("button-default", disabled && "disabled", classNames)}
      onClick={handleClick}
    >
      <span>{label}</span>
    </button>
  )
}