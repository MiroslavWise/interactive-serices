"use client";

import { type TButtonPropsDefault } from "../types";

export const ButtonDefault: TButtonPropsDefault = ({
  label,
  handleClick,
  disabled,
  classNames,
}) => {
  return (
    <button
      className={`button-default ${disabled ? 'disabled' : ''} ${classNames ? classNames : ''}`}
      onClick={handleClick}
    >
      <span>{label}</span>
    </button>
  )
}