"use client"

import { type TButtonPropsFill } from "./types"

export const ButtonFill: TButtonPropsFill = ({
  label,
  classNames,
  handleClick,
  disabled,
  type,
  submit,
  shadow,
  small,
  dataAttribute,
}) => {
  return (
    <button
      {...dataAttribute || []}
      className={`button-fill ${type || "primary"} ${disabled ? "disabled" : ""} ${classNames ? classNames : ""} ${shadow ? "shadow" : ""} ${small ? "small" : ""}`}
      onClick={handleClick}
      type={submit || "button"}
    >
      <span>{label}</span>
    </button>
  )
}