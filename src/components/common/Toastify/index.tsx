import { toast } from "react-toastify"
import { useTheme } from "next-themes"

export const OnErrorToastify = (value: string) => {
    const { systemTheme } = useTheme()

    return toast(value, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: systemTheme,
    })
}

export const OnSuccessToastify = (value: string) => {
    const { systemTheme } = useTheme()

    return toast(value, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: systemTheme,
    })
}
