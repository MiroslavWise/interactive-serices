"use client"

import { type TButtonPropsFill } from "./types"

import { cx } from "@/lib/cx"

export const ButtonFill: TButtonPropsFill = ({
  label,
  classNames,
  handleClick,
  disabled,
  type,
  submit,
  shadow,
  small,
}) => {
  return (
    <button
      className={cx("button-fill", (type || "primary"), disabled && "disabled", classNames, shadow && "shadow", small && "small")}
      onClick={handleClick}
      type={submit || "button"}
    >
      <span>{label}</span>
    </button>
  )
}