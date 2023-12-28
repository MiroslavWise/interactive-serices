"use client"

import Link from "next/link"
import { LegacyRef, forwardRef, useMemo } from "react"

import type { TTypeButton, TTypeButtonLink } from "../types/types"

import { cx } from "@/lib/cx"

import styles from "../styles/button.module.scss"

export const Button = forwardRef(function Button(props: TTypeButton, ref?: LegacyRef<HTMLButtonElement>) {
    const { loading, label, suffixIcon, prefixIcon, typeButton, className, ...rest } = props ?? {}

    const loadingImage = useMemo(() => {
        if (loading) {
            return <img src="/svg/loading-02.svg" alt="loading" data-loading-image height={20} width={20} />
        }

        return null
    }, [loading])

    return (
        <button
            {...rest}
            className={cx(styles.container, className)}
            data-type-button={typeButton || "fill-primary"}
            disabled={!!loading || rest.disabled}
            data-disabled={rest.disabled}
            ref={ref}
        >
            {prefixIcon}
            <span>{label}</span>
            {suffixIcon ? suffixIcon : loadingImage ? loadingImage : null}
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
