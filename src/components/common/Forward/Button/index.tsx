"use client"

import Image from "next/image"
import { LegacyRef, forwardRef, useMemo } from "react"

import type { TTypeButton } from "../types/types"

import { cx } from "@/lib/cx"

import styles from "../styles/button.module.scss"

export const Button = forwardRef(function Button(
    props: TTypeButton,
    ref?: LegacyRef<HTMLButtonElement>,
) {
    const {
        loading,
        label,
        suffixIcon,
        prefixIcon,
        typeButton,
        className,
        ...rest
    } = props ?? {}

    const loadingImage = useMemo(() => {
        if (loading) {
            return (
                <Image
                    src="/svg/loading-03.svg"
                    alt="loading"
                    data-loading-image
                    height={20}
                    width={20}
                />
            )
        }

        return null
    }, [loading])

    return (
        <button
            {...rest}
            className={cx(styles.container, className)}
            data-type-button={typeButton || "fill-primary"}
            disabled={!!loading}
            ref={ref}
        >
            {prefixIcon}
            <span>{label}</span>
            {suffixIcon ? suffixIcon : loadingImage ? loadingImage : null}
        </button>
    )
})
