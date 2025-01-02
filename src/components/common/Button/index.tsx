"use client"

import Link from "next/link"
import { type ButtonHTMLAttributes, type LegacyRef, type ReactNode, forwardRef } from "react"

import IconSpinner from "@/components/icons/IconSpinner"

import { cx } from "@/lib/cx"

/** Общие стили для кнопки */
const baseStyles = (loading: boolean) =>
  cx(
    "relative border-none outline-none w-full rounded-[1.375rem] px-6 py-2.5",
    "flex flex-row items-center justify-center cursor-pointer gap-2 touch-manipulation",
    "z-[2] h-11 max-md:h-9 rounded-[1.125rem] [&>span]:text-sm",
    "[&>img]:w-6 [&>img]:h-6 [&>svg]:w-6 [&>svg]:h-6",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    loading && "opacity-50",
  )

/** Стили для текста */
const textStyles = (loading: boolean, label?: string) =>
  cx(
    "text-sm text-center whitespace-nowrap font-medium selection:bg-transparent",
    loading ? "opacity-60" : "opacity-100",
    !label && "hidden",
  )

/** Стили для спиннера */
const spinnerStyles = (loading: boolean) =>
  cx(
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5",
    loading ? "opacity-100 visible flex" : "opacity-0 invisible hidden",
  )

/** Стили для разных типов кнопок */
const typeStyles = {
  white: "bg-text-button [&>span]:text-text-accent",
  "fill-primary": "bg-btn-main-default [&>span]:text-text-button hover:bg-btn-main-hover",
  "fill-opacity": "bg-opacity-white-hard [&>span]:text-supporting-white",
  "regular-primary": "bg-btn-second-default [&>span]:text-text-accent hover:bg-btn-second-hover",
} as const

/** Типы для кнопок */
type TTypeButtonPrimary = keyof typeof typeStyles

interface IButtonCommon {
  label?: string
  suffixIcon?: ReactNode
  prefixIcon?: ReactNode
  typeButton?: TTypeButtonPrimary
  title?: string
}

interface IButton extends IButtonCommon {
  loading?: boolean
}

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IButton
type TButtonLinkProps = IButtonCommon & typeof Link.defaultProps

/** Основной компонент Button */
const Button = forwardRef(function Button(props: TButtonProps, ref?: LegacyRef<HTMLButtonElement>) {
  const { loading, label, suffixIcon, prefixIcon, typeButton = "fill-primary", className, title, disabled, ...rest } = props

  return (
    <button
      {...rest}
      className={cx(baseStyles(!!loading), typeStyles[typeButton], className)}
      data-type-button={typeButton}
      disabled={disabled || loading}
      data-disabled={disabled}
      ref={ref}
      data-loading={loading}
      data-button-forward
      title={title}
      aria-label={title || label}
      aria-labelledby={title || label}
    >
      {prefixIcon}
      {label && <span className={textStyles(!!loading, label)}>{label}</span>}
      {suffixIcon}
      <div className={spinnerStyles(!!loading)}>
        <IconSpinner />
      </div>
    </button>
  )
})

Button.displayName = "Button"
export default Button

/** Компонент ButtonLink */
const ButtonLink = forwardRef(function ButtonLink(props: TButtonLinkProps, ref?: LegacyRef<HTMLAnchorElement>) {
  const { label, href, suffixIcon, prefixIcon, title, typeButton = "fill-primary", className, ...rest } = props

  return (
    <Link
      {...rest}
      href={href ?? "#"}
      className={cx(baseStyles(false), typeStyles[typeButton], className)}
      data-type-button={typeButton}
      data-button-forward
      title={title}
      aria-label={title || label}
      aria-labelledby={title || label}
      ref={ref}
    >
      {prefixIcon}
      {label && <span className={textStyles(false, label)}>{label}</span>}
      {suffixIcon}
    </Link>
  )
})

ButtonLink.displayName = "ButtonLink"
export { Button, ButtonLink }
