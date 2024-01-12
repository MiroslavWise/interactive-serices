"use client"

import Link from "next/link"
import { LegacyRef, forwardRef } from "react"

import type { TTypeButton, TTypeButtonLink } from "../types/types"

import { cx } from "@/lib/cx"

import styles from "../styles/button.module.scss"

export const Button = forwardRef(function Button(props: TTypeButton, ref?: LegacyRef<HTMLButtonElement>) {
    const { loading, label, suffixIcon, prefixIcon, typeButton, className, ...rest } = props ?? {}

    return (
        <button
            {...rest}
            className={cx(styles.container, className)}
            data-type-button={typeButton || "fill-primary"}
            disabled={!!loading || rest.disabled}
            data-disabled={rest.disabled}
            ref={ref}
            data-loading={loading}
            data-button-forward
        >
            {prefixIcon}
            <span>{label}</span>
            {suffixIcon ? suffixIcon : null}
            <div data-load>
                <img src="/svg/spinner.svg" alt="spinner" data-loading-image height={20} width={20} />
            </div>
        </button>
    )
})

export const ButtonLink = forwardRef(function Button(props: TTypeButtonLink & typeof Link.defaultProps) {
    const { label, href, suffixIcon, prefixIcon, typeButton, ...rest } = props ?? {}

    return (
        <Link {...rest!} href={href ? href : {}} className={styles.container} data-type-button={typeButton || "fill-primary"}>
            {prefixIcon}
            <span>{label}</span>
            {suffixIcon ? suffixIcon : null}
        </Link>
    )
})
