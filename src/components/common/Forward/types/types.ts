import type { ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"

type TTypeButtonPrimary = "fill-primary" | "fill-orange" | "regular-primary" | "regular-orange" | "white" | "fill-opacity"

interface IButton {
  label?: string
  loading?: boolean
  suffixIcon?: ReactNode
  prefixIcon?: ReactNode
  typeButton?: TTypeButtonPrimary
}

export type TTypeButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & IButton
export type TTypeButtonLink = IButton
