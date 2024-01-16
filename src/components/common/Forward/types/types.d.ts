import Link from "next/link"
import type { ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"
import React from "react"

interface IInputData {
    label?: string
    error?: string
    rules?: boolean
}

type TTypeButtonPrimary = "fill-primary" | "fill-orange" | "regular-primary" | "regular-orange" | "white" | "fill-opacity"

interface IButton {
    label?: string
    loading?: boolean
    suffixIcon?: ReactNode
    prefixIcon?: ReactNode
    typeButton?: TTypeButtonPrimary
}

export type TTypeInput = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & IInputData

export type TTypeButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & IButton

export type TTypeButtonLink = IButton
