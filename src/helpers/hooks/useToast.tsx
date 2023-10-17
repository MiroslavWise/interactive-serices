"use client"

import { useId } from "react"
import { toast } from "react-toastify"

export const useToast = () => {
    const id = useId()
    function on(value: string) {
        return toast(value, {
            toastId: id,
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "data-now",
        })
    }

    return { on }
}
