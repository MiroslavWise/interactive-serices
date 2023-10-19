"use client"

import { useId } from "react"
import { toast } from "react-toastify"

export const useToast = () => {
    const id = useId()

    const classNames: Record<TTypeToast, string> = {
        success: "toast-success",
        error: "toast-error",
        warning: "toast-warning",
        barter: "toast-barter",
        default: "toast-default",
    }

    function on(value: string, type?: TTypeToast) {
        return toast(value, {
            toastId: id,
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: classNames?.[type!] || classNames.default,
        })
    }

    return { on }
}

type TTypeToast = "success" | "error" | "warning" | "default" | "barter"
