"use client"

import Link from "next/link"
import { type ButtonHTMLAttributes, DetailedHTMLProps, type LegacyRef, type ReactNode, forwardRef } from "react"

import IconSpinner from "@/components/icons/IconSpinner"

import { cx } from "@/lib/cx"

const Button = forwardRef(function Button(props: TTypeButton, ref?: LegacyRef<HTMLButtonElement>) {
  const { loading, label, suffixIcon, prefixIcon, typeButton = "fill-primary", className, title, ...rest } = props ?? {}

  return (
    <button
      {...rest}
      className={cx(
        "relative border-none outline-none w-full rounded-[1.375rem] px-6 py-2.5 flex flex-row items-center justify-center cursor-pointer gap-2 touch-manipulation z-[2] h-11",
        "max-md:h-9 rounded-[1.125rem] [&>span]:text-sm",
        "[&>img]:w-6 [&>img]:h-6 [&>svg]:w-6 [&>svg]:h-6",
        "disabled:opacity-50 disabled:cursor-no-drop",
        loading && "opacity-50",
        typeButton === "white" && "bg-text-button [&>span]:text-text-accent",
        typeButton === "fill-primary" && "bg-btn-main-default [&>span]:text-text-button hover:bg-btn-main-hover",
        typeButton === "fill-opacity" && "bg-opacity-white-hard [&>span]:text-supporting-white",
        typeButton === "regular-primary" && "bg-btn-second-default [&>span]:text-text-accent hover:bg-btn-second-hover",
        className,
      )}
      data-type-button={typeButton || "fill-primary"}
      disabled={!!loading || rest.disabled}
      data-disabled={rest.disabled}
      ref={ref}
      data-loading={loading}
      data-button-forward
      title={title ? title : undefined}
      aria-label={title ? title : label}
      aria-labelledby={title ? title : label}
    >
      {prefixIcon ? prefixIcon : null}
      <span
        className={cx(
          !label && "!hidden",
          "text-sm text-center whitespace-nowrap font-medium selection:bg-transparent",
          loading ? "opacity-60" : "opacity-100",
        )}
      >
        {label}
      </span>
      {suffixIcon ? suffixIcon : null}
      <div
        className={cx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5",
          loading ? "opacity-100 visible flex" : "opacity-0 invisible hidden",
        )}
      >
        <IconSpinner />
      </div>
    </button>
  )
})

Button.displayName = "Button"
export default Button

export const ButtonLink = forwardRef(function Button(props: TTypeButtonLink & typeof Link.defaultProps) {
  const { label, href, suffixIcon, prefixIcon, title, typeButton, ...rest } = props ?? {}

  return (
    <Link
      {...rest!}
      href={href ? href : {}}
      className={cx(
        "relative border-none outline-none w-full rounded-[1.375rem] px-6 py-2.5 flex flex-row items-center justify-center cursor-pointer gap-2 touch-manipulation z-[2] h-11",
        "max-md:h-9 rounded-[1.125rem] [&>span]:text-sm",
        "[&>img]:w-6 [&>img]:h-6",
        "disabled:opacity-50 disabled:cursor-no-drop",
        typeButton === "white" && "bg-text-button [&>span]:text-text-accent",
        typeButton === "fill-primary" && "bg-btn-main-default [&>span]:text-text-button hover:bg-btn-main-hover",
        typeButton === "fill-opacity" && "bg-opacity-white-hard [&>span]:text-supporting-white",
        typeButton === "regular-primary" && "bg-btn-second-default [&>span]:text-text-accent hover:bg-btn-second-hover",
      )}
      data-type-button={typeButton || "fill-primary"}
      data-button-forward
      title={title ? title : undefined}
      aria-label={title ? title : label}
      aria-labelledby={title ? title : label}
    >
      {prefixIcon}
      <span className={cx("opacity-100 text-sm text-center whitespace-nowrap font-medium selection:bg-transparent")}>{label}</span>
      {suffixIcon ? suffixIcon : null}
    </Link>
  )
})

type TTypeButtonPrimary = "fill-primary" | "fill-orange" | "regular-primary" | "regular-orange" | "white" | "fill-opacity"

interface IButton {
  label?: string
  loading?: boolean
  suffixIcon?: ReactNode
  prefixIcon?: ReactNode
  typeButton?: TTypeButtonPrimary
}

type TTypeButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & IButton
type TTypeButtonLink = IButton
