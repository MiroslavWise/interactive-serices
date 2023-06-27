"use client";

import { type TButtonPropsFill } from "../types";

export const ButtonFill: TButtonPropsFill = ({
  label,
  classNames,
  handleClick,
  disabled,
  type,
  submit,
}) => {
  return (
    <button
      className={`button-fill ${type || 'primary'} ${disabled ? 'disabled' : ''} ${classNames ? classNames : ''}`}
      onClick={handleClick}
      type={submit || "button"}
    >
      <span>{label}</span>
    </button>
  )
}