"use client"

import { toast } from "react-toastify"
import { isMobile } from "react-device-detect"
import { DispatchWithoutAction, useId } from "react"

export const useToast = () => {
    const id = useId()

    const classNames: Record<TTypeToast, string> = {
        success: "toast-success",
        error: "toast-error",
        warning: "toast-warning",
        barter: "toast-barter",
        default: "toast-default",
        message: "toast-message",
    }

    function on(
        value: string,
        type?: TTypeToast,
        onClick?: DispatchWithoutAction,
    ) {
        return toast(value, {
            toastId: id,
            position: isMobile ? "top-center" : "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: classNames?.[type!] || classNames.default,
            onClick() {
                if (onClick) onClick()
            },
        })
    }

    return { on }
}

type TTypeToast =
    | "success"
    | "error"
    | "warning"
    | "default"
    | "barter"
    | "message"
